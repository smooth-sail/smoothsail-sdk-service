import { Flag } from "../models/Flag";

describe("test flag instance", () => {
  let flag;

  beforeEach(() => {
    flag = new Flag({ fKey: "test-flag", isActive: false });
  });

  test("Flag has properties", () => {
    expect(flag.fKey).toBeDefined();
    expect(typeof flag.fKey).toBe("string");
    expect(flag.fKey).toBe("test-flag");

    expect(flag.isActive).toBeDefined();
    expect(typeof flag.isActive).toBe("boolean");
    expect(flag.isActive).toBe(false);

    expect(flag.segments).toBeDefined();
    expect(Array.isArray(flag.segments)).toBe(true);
    expect(flag.segments.length).toBe(0);
  });

  test("Only isActive and segments are updated on flag update", () => {
    const updated = {
      fKey: "flag-2",
      isActive: false,
      segments: [
        {
          sKey: "my-test-seg",
          rulesOperator: "all",
          rules: [],
        },
      ],
    };

    expect(flag.fKey).toBe("test-flag");
    expect(flag.isActive).toBe(false);
    expect(flag.segments.length).toBe(0);

    flag.updateFlag(updated);
    expect(flag.fKey).toBe("test-flag");
    expect(flag.isActive).toBe(updated.isActive);
    expect(flag.segments.length).toBe(1);
    expect(flag.segments[0]).toEqual(updated.segments[0]);
  });

  test("Segment is added to flag", () => {
    const segment = {
      sKey: "my-test-seg",
      rulesOperator: "all",
      rules: [],
    };

    expect(flag.segments.length).toBe(0);

    flag.addSegment(segment);
    expect(flag.segments.length).toBe(1);
    expect(flag.segments[0].sKey).toBe(segment.sKey);
    expect(flag.segments[0].rulesOperator).toBe(segment.rulesOperator);
    expect(flag.segments[0].rules).toEqual(segment.rules);
  });

  test("Segment is removed from flag", () => {
    flag = new Flag({
      fKey: "test-flag",
      isActive: false,
      segments: [
        {
          sKey: "my-test-seg",
          rulesOperator: "all",
          rules: [],
        },
      ],
    });

    expect(flag.segments.length).toBe(1);
    flag.removeSegment({ sKey: "my-test-seg" });
    expect(flag.segments.length).toBe(0);
  });

  test("Segment body is updated", () => {
    flag = new Flag({
      fKey: "test-flag",
      isActive: false,
      segments: [
        {
          sKey: "my-test-seg",
          rulesOperator: "all",
          rules: [],
        },
      ],
    });

    expect(flag.segments[0].rulesOperator).toBe("all");
    flag.updateSegmentBody({
      sKey: "my-test-seg",
      rulesOperator: "any",
    });
    expect(flag.segments[0].rulesOperator).toBe("any");
  });

  test("Rule is added to segment", () => {
    flag = new Flag({
      fKey: "test-flag",
      isActive: false,
      segments: [
        {
          sKey: "my-test-seg",
          rulesOperator: "all",
          rules: [],
        },
      ],
    });

    expect(flag.segments[0].rules.length).toBe(0);
    flag.addRule({
      aKey: "state",
      rKey: "state-of-residence",
      sKey: "my-test-seg",
      type: "string",
      operator: "=",
      value: "CA",
    });
    expect(flag.segments[0].rules.length).toBe(1);
  });

  test("Rule is removed from segment", () => {
    flag = new Flag({
      fKey: "test-flag",
      isActive: false,
      segments: [
        {
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
        },
      ],
    });

    expect(flag.segments[0].rules.length).toBe(1);
    flag.removeRule({
      rKey: "state-of-residence",
      sKey: "my-test-seg",
    });
    expect(flag.segments[0].rules.length).toBe(0);
  });

  test("Rule is updated", () => {
    flag = new Flag({
      fKey: "test-flag",
      isActive: false,
      segments: [
        {
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
        },
      ],
    });

    expect(flag.segments[0].rules[0].value).toBe("CA");
    flag.updateSegmentRule({
      rKey: "state-of-residence",
      aKey: "state",
      operator: "is",
      value: "AZ",
      type: "string",
      sKey: "my-test-seg",
    });
    expect(flag.segments[0].rules[0].value).toBe("AZ");
  });
});
