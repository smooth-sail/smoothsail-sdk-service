import { Rule } from "../models/Rule";

test("Rule has all properties", () => {
  const rule = new Rule({
    aKey: "state",
    rKey: "state-of-residence",
    type: "string",
    operator: "=",
    value: "CA",
  });

  expect(rule.aKey).toBe("state");
  expect(rule.rKey).toBe("state-of-residence");
  expect(rule.operator).toBe("=");
  expect(rule.type).toBe("string");
  expect(rule.value).toBe("CA");
});
