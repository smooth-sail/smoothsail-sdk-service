import { Flag } from "./flag";

export class Flags {
  constructor(flags) {
    this.flagData = {};

    for (let flag in flags) {
      this.flagData[flag] = new Flag(flags[flag]);
    }
  }

  updateFlagData(notification) {
    let flag = this.flagData[notification.payload["f_key"]];

    switch (notification.type) {
      case "new-flag":
        this.flagData[notification.payload["f_key"]] = new Flag(
          notification.payload
        );
        break;
      case "toggle":
        flag.updateFlag(notification.payload);
        break;
      case "deleted-flag":
        delete this.flagData[notification.payload["f_key"]];
        break;
      case "segment add":
        flag.addSegment(notification.payload.segment);
        break;
      case "segment remove":
        flag.removeSegment(notification.payload);
        break;
      case "segment body update":
        for (let f in this.flagData) {
          f.updateSegmentBody(notification.payload);
        }
        break;
      case "rule add":
        for (let f in this.flagData) {
          f.addRule(notification.payload);
        }
        break;
      case "rule remove":
        for (let f in this.flagData) {
          f.removeRule(notification.payload);
        }
        break;
      case "rule update":
        for (let f in this.flagData) {
          f.updateSegmentRule(notification.payload);
        }
        break;
    }
  }
}
