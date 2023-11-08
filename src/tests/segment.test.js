import { Segment } from "../models/Segment";

describe("Testing segment instance", () => {
  let segment;

  beforeEach(() => {
    segment = new Segment({
      sKey: "my-test-seg",
      rulesOperator: "all",
      rules: [
        {
          aKey: "state",
          rKey: "state-of-residence",
          sKey: "my-test-seg",
          type: "string",
          operator: "=",
          value: "CA",
        },
      ],
    });
  });

  test("Segment body is updated", () => {
    expect(segment.rulesOperator).toBe("all");
    segment.updateSegmentBody({ rulesOperator: "any" });
    expect(segment.rulesOperator).toBe("any");
  });

  test("Segment rule is added", () => {
    expect(segment.rules.length).toBe(1);
    segment.addRule({
      aKey: "email",
      rKey: "company-email",
      type: "string",
      operator: "contains",
      value: "@company.com",
    });
    expect(segment.rules.length).toBe(2);
    expect(segment.rules[1].rKey).toBe("company-email");
  });

  test("Segment rule is removed", () => {
    expect(segment.rules.length).toBe(1);
    segment.removeRule({ rKey: "state-of-residence" });
    expect(segment.rules.length).toBe(0);
  });

  test("Segment rule is updated", () => {
    expect(segment.rules[0].operator).toBe("=");
    expect(segment.rules[0].value).toBe("CA");

    segment.updateSegmentRule({
      aKey: "state",
      rKey: "state-of-residence",
      type: "string",
      operator: "is",
      value: "WA",
    });

    expect(segment.rules[0].operator).toBe("is");
    expect(segment.rules[0].value).toBe("WA");
  });
});
