import { Segment } from "./segment";

export class Flag {
  constructor({ fKey, isActive, createdAt, updatedAt, segments }) {
    this.fKey = fKey;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.segments = [];
    if (segments && segments.length !== 0) {
      segments.forEach((segment) => {
        this.segments.push(new Segment(segment));
      });
    }
  }

  updateFlag({ isActive, updatedAt, segments }) {
    if (isActive) {
      this.isActive = isActive;
    }

    if (updatedAt) {
      this.updatedAt = updatedAt;
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

  addSegment(segment) {
    this.segments.push(new Segment(segment));
  }

  removeSegment(deleteSegment) {
    let newSegments = this.segments.filter(
      (segment) => segment["sKey"] !== deleteSegment["sKey"]
    );
    this.segments = newSegments;
  }

  updateSegmentBody(updatedSegment) {
    this.segments.forEach((segment) => {
      if (segment.sKey === updatedSegment.sKey) {
        segment.updateSegmentBody(updatedSegment);
      }
    });
  }

  addRule(newRule) {
    this.segments.forEach((segment) => {
      if (segment.sKey === newRule["sKey"]) {
        segment.addRule(newRule);
      }
    });
  }

  removeRule(removeRule) {
    this.segments.forEach((segment) => {
      if (segment.sKey === removeRule["sKey"]) {
        segment.removeRule(removeRule);
      }
    });
  }

  updateSegmentRule(updatedSegmentRule) {
    this.segments.forEach((segment) => {
      if (segment.sKey === updatedSegmentRule["sKey"]) {
        segment.updateSegmentRule(updatedSegmentRule);
      }
    });
  }
}
