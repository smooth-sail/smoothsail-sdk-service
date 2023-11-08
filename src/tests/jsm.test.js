import jsm from "../nats";

test("JetStreamManager has all methods and properties", () => {
  expect(typeof jsm.init).toBe("function");
  expect(typeof jsm._connectToJetStream).toBe("function");
  expect(typeof jsm._logConnectionEvents).toBe("function");
  expect(typeof jsm._subscribeToStream).toBe("function");
  expect(typeof jsm.requestAllFlags).toBe("function");
  expect(typeof jsm.validateSdkKey).toBe("function");
  expect(typeof jsm._createConfig).toBe("function");

  expect(typeof jsm.sc).toBe("object");
  expect(typeof jsm.sc.decode).toBe("function");
  expect(typeof jsm.sc.encode).toBe("function");
});
