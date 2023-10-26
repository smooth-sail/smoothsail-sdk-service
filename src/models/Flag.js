import { Segment } from "./Segment";

export class Flag {
  constructor({ f_key, is_active, created_at, updated_at, segments }) {
    this.f_key = f_key;
    this.is_active = is_active;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.segments = [];
    if (segments && segments.length !== 0) {
      segments.forEach((segment) => {
        this.segments.push(new Segment(segment));
      });
    }
  }

  updateFlag({ is_active, updated_at, segments }) {
    if (is_active) {
      this.is_active = is_active;
    }

    if (updated_at) {
      this.updated_at = updated_at;
    }

    if (segments) {
      this.segments = [];
      if (segments.length !== 0) {
        segments.forEach((segment) => {
          this.segments.push(new Segment(segment));
        });
      }
    }
  }

  evaluateFlag(userContext = {}) {
    return this.is_active && this.isUserInASegment(userContext);
  }

  isUserInASegment(userContext) {
    if (this.segments.length === 0) {
      return true;
    }

    // check if user context evals to true for any associated segment
    return this.segments.some((segment) =>
      segment.evaluateSegment(userContext)
    );
  }

  addSegment(segment) {
    this.segments.push(new Segment(segment));
  }

  removeSegment(deleteSegment) {
    let newSegments = this.segments.filter(
      (segment) => segment["s_key"] !== deleteSegment["s_key"]
    );
    this.segments = newSegments;
  }

  updateSegmentBody(updatedSegment) {
    this.segments.forEach((segment) => {
      if (segment.s_key === updatedSegment.s_key) {
        segment.updateSegmentBody(updatedSegment);
      }
    });
  }

  addRule(newRule) {
    this.segments.forEach((segment) => {
      if (segment.s_key === newRule["s_key"]) {
        segment.addRule(newRule);
      }
    });
  }

  removeRule(removeRule) {
    this.segments.forEach((segment) => {
      if (segment.s_key === removeRule["s_key"]) {
        segment.removeRule(removeRule);
      }
    });
  }

  updateSegmentRule(updatedSegmentRule) {
    this.segments.forEach((segment) => {
      if (segment.s_key === updatedSegmentRule["s_key"]) {
        segment.updateSegmentRule(updatedSegmentRule);
      }
    });
  }
}
