import "dotenv/config";
import {
  connect,
  JSONCodec,
  StringCodec,
  consumerOpts,
  createInbox,
} from "nats";

class JetstreamManager {
  constructor() {
    this.sc = StringCodec();
    this.jc = JSONCodec();
  }

  async init() {
    await this.connectToJetStream();
    await this.subscribeToStream();
  }

  async connectToJetStream() {
    this.natsConnection = await connect({ servers: process.env.NATS_SERVER });
    this.jetstream = this.natsConnection.jetstream();
  }

  async subscribeToStream() {
    const sub = await this.jetstream.subscribe(
      "FLAG_DATA.request",
      this.config("request")
    );

    (async () => {
      for await (const m of sub) {
        console.log(JSON.parse(this.sc.decode(m.data)));
        m.ack();
      }
    })(sub);
  }

  config(subject) {
    const opts = consumerOpts();
    opts.durable(subject);
    opts.manualAck();
    opts.ackExplicit();
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
