import "dotenv/config";
import { logger } from "../utils/logger";
import { connect, StringCodec, consumerOpts, createInbox, Events } from "nats";

import clients from "../models/sse-clients";
import FlagCache from "../cache/flagCache";

import { handleUpdateNotification, addFlagsToCache } from "../utils/flags";

const handleFlagUpdate = async (err, msg) => {
  if (err) {
    logger.error(err);
  } else {
    const message = JSON.parse(StringCodec().decode(msg.data));
    handleUpdateNotification(message);
    clients.sendNotificationToAllClients({ type: "flags", payload: FlagCache });
    msg.ack();
  }
};

const handleFlagsReply = (err, msg) => {
  if (err) {
    logger.error(err);
  } else {
    const data = JSON.parse(StringCodec().decode(msg.data));
    addFlagsToCache(data);
    logger.info("Feature flag data received from Manager.");
    logger.debug(FlagCache);

    msg.ack();
  }
};

const handleKeyUpdate = (err, msg) => {
  if (err) {
    logger.error(err);
  } else {
    const data = JSON.parse(StringCodec().decode(msg.data));
    logger.warn("SDK Key has been regenerated. Closing all SSE connections.");
    logger.debug(data);

    clients.closeAllClients();
    msg.ack();
  }
};

class JetstreamManager {
  constructor() {
    this.sc = StringCodec();
  }

  async init() {
    await this._connectToJetStream();
    await this._subscribeToStream("FLAG_DATA", "FLAG_UPDATE", handleFlagUpdate);
    await this._subscribeToStream(
      "FLAG_DATA",
      "GET_ALL_FLAGS",
      handleFlagsReply
    );
    await this._subscribeToStream("SDK_KEY", "KEY_UPDATE", handleKeyUpdate);
  }

  async _connectToJetStream() {
    this.nc = await connect({
      servers: process.env.NATS_SERVER,
      reconnectTimeWait: 3000,
    });
    this.js = await this.nc.jetstream();
    this.jsm = await this.nc.jetstreamManager();

    this._logConnectionEvents();
  }

  async _logConnectionEvents() {
    for await (const s of this.nc.status()) {
      switch (s.type) {
        case Events.Disconnect:
          logger.error(
            `NATS Jetstream client disconnected from nats://${s.data}`
          );
          break;
        case Events.Reconnect:
          await this.requestAllFlags();
          logger.info(`NATS Jetstream client reconnected to nats://${s.data}`);
          break;
        default:
      }
    }
  }

  async _subscribeToStream(stream, subject, callbackFn) {
    await this.js.subscribe(
      `${stream}.${subject}`,
      this._createConfig(subject, callbackFn)
    );
  }

  async requestAllFlags() {
    const encodedMessage = this.sc.encode("Request all flags");
    await this.js
      .publish("FLAG_DATA.REQUEST_ALL_FLAGS", encodedMessage)
      .catch((err) => logger.error(err));
  }

  async validateSdkKey(key) {
    const sdkKey = this.sc.encode(key);
    const result = await this.nc
      .request("SDK_KEY", sdkKey, { timeout: 1000 })
      .catch((err) => logger.error(err));

    const data = result._rdata.toString();
    return JSON.parse(data);
  }

  _createConfig(subject, callbackFn) {
    const opts = consumerOpts();

    opts.deliverNew();
    opts.deliverTo(createInbox());
    opts.durable(subject);
    opts.manualAck();
    callbackFn && opts.callback(callbackFn.bind(this));

    return opts;
  }
}

const jsm = new JetstreamManager();

export default jsm;
