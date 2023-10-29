import "dotenv/config";
import { connect, StringCodec, consumerOpts, createInbox } from "nats";

const handleFlagUpdate = (err, msg) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(JSON.parse(StringCodec().decode(msg.data)));
    // Handle flag update
    msg.ack();
  }
};

const handleFlagsRequest = (err, msg) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(JSON.parse(StringCodec().decode(msg.data)));
    // Handle updating flag cache.
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
      handleFlagsRequest
    );
  }

  async connectToJetStream() {
    this.nc = await connect({ servers: process.env.NATS_SERVER });
    this.js = this.nc.jetstream();
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

  createConfig(subject, callbackFn) {
    const opts = consumerOpts();

    opts.deliverNew();
    opts.deliverTo(createInbox());
    opts.durable(subject);
    callbackFn && opts.callback(callbackFn.bind(this));
    opts.manualAck();

    return opts;
  }
}

// Create an instance of the JetstreamManager class
const jsm = new JetstreamManager();

// // Call the `initialize` method to start the initialization process
(async () => {
  await jsm.init();
})();

export default jsm;
