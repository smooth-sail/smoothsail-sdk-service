import "dotenv/config";
import { connect, StringCodec, consumerOpts, createInbox } from "nats";
import { handleUpdateNotification, addFlagsToCache } from "../utils/flags";
import clients from "../models/sse-clients";
import FlagCache from "../cache/flagCache";
import keyMemory from "../models/Key";

const handleFlagUpdate = (err, msg) => {
  if (err) {
    console.error("Error:", err);
  } else {
    const message = JSON.parse(StringCodec().decode(msg.data));
    // update the flag cache based on the message
    handleUpdateNotification(message);

    // send the latest flag cache to all clients via SSE
    clients.sendNotificationToAllClients({ type: "flags", payload: FlagCache });
    msg.ack();
  }
};

const handleFlagsReply = (err, msg) => {
  if (err) {
    console.error("Error:", err);
  } else {
    const data = JSON.parse(StringCodec().decode(msg.data));
    addFlagsToCache(data);
    console.log("Flags have been retrieved:", FlagCache);
    msg.ack();
  }
};

const handleKeyUpdate = (err, msg) => {
  if (err) {
    console.error("Error:", err);
  } else {
    const data = JSON.parse(StringCodec().decode(msg.data));
    console.log("Message from manager:", data);
    keyMemory.clearKeyInMemory();

    // message means new sdk key - close all SSE connections
    clients.closeAllClients();
    msg.ack();
  }
};

class JetstreamManager {
  constructor() {
    this.sc = StringCodec();
  }

  async init() {
    await this.connectToJetStream();
    await this.subscribeToStream("FLAG_DATA", "FLAG_UPDATE", handleFlagUpdate);
    await this.subscribeToStream(
      "FLAG_DATA",
      "GET_ALL_FLAGS",
      handleFlagsReply
    );
    await this.subscribeToStream("SDK_KEY", "KEY_UPDATE", handleKeyUpdate);
  }

  async connectToJetStream() {
    this.nc = await connect({ servers: process.env.NATS_SERVER });
    this.js = await this.nc.jetstream();
  }

  async subscribeToStream(stream, subject, callbackFn) {
    await this.js.subscribe(
      `${stream}.${subject}`,
      this.createConfig(subject, callbackFn)
    );
  }

  async requestAllFlags() {
    const encodedMessage = this.sc.encode("Request all flags");
    await this.js
      .publish("FLAG_DATA.REQUEST_ALL_FLAGS", encodedMessage)
      .catch((err) => {
        throw Error(
          err,
          "NATS Jetstream: Publish message has failed. Check your connection."
        );
      });
  }

  async validateSdkKey(key) {
    const sdkKey = this.sc.encode(key);
    const result = await this.nc
      .request("SDK_KEY", sdkKey, { timeout: 1000 })
      .catch((err) => {
        console.log(`problem with request: ${err.message}`);
      });

    const data = result._rdata.toString();
    return JSON.parse(data);
  }

  createConfig(subject, callbackFn) {
    const opts = consumerOpts();

    opts.deliverNew();
    opts.deliverTo(createInbox());
    opts.durable(subject);
    // opts.deliverTo(subject);
    opts.manualAck();
    callbackFn && opts.callback(callbackFn.bind(this));

    return opts;
  }
}

// Create an instance of the JetstreamManager class
const jsm = new JetstreamManager();

export default jsm;
