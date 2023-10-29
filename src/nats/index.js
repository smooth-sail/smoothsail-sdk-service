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
    this.natsConnection = await connect({ servers: process.env.NATS_SERVER });
    this.jetstream = this.natsConnection.jetstream();
  }

  async subscribeToStream(stream, subject, handler) {
    await this.jetstream.subscribe(
      `${stream}.${subject}`,
      this.config(subject, handler)
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

  config(subject, handler) {
    const opts = consumerOpts();
    opts.durable(subject);
    opts.manualAck();
    opts.deliverNew();
    // opts.ackExplicit();

    // This can be used to handle incoming messages.
    opts.callback(handler.bind(this));
    opts.deliverTo(createInbox());

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
