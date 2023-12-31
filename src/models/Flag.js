import { Segment } from "./Segment";

export class Flag {
  constructor({ fKey, isActive, segments }) {
    this.fKey = fKey;
    this.isActive = isActive;
    this.segments = [];

    if (segments && segments.length !== 0) {
      segments.forEach((segment) => {
        this.segments.push(new Segment(segment));
      });
    }
  }

  updateFlag({ isActive, segments }) {
    if (isActive !== undefined) {
      this.isActive = isActive;
    }

    if (segments !== undefined) {
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
    console.log(newRule);
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
