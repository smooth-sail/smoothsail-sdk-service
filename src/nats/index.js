import "dotenv/config";
import { connect, StringCodec, consumerOpts, createInbox } from "nats";

const handleMessage = (err, msg) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(JSON.parse(StringCodec().decode(msg.data)));
    msg.ack();
  }
};

class JetstreamManager {
  constructor() {
    this.sc = StringCodec();
  }

  async init() {
    await this.connectToJetStream();
    await this.subscribeToStream("FLAG_DATA", "request", handleMessage);
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

  config(subject, handler) {
    const opts = consumerOpts();
    opts.durable(subject);
    opts.manualAck();
    // opts.ackExplicit();

    // This can be used to handle incoming messages.
    opts.callback(handler);

    // Needed for a push consumer later if we request feature flag data
    // through NATS Jetstream instead of REST API.
    // opts.deliverTo(createInbox());

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
