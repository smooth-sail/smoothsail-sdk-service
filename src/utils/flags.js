import FlagCache from "../cache/flagCache";
import { Flag } from "../models/flag";

export const handleUpdateNotification = (notification) => {
  let flag = FlagCache[notification.payload["f_key"]];

  switch (notification.type) {
    case "new-flag":
      FlagCache[notification.payload["f_key"]] = new Flag(notification.payload);
      break;
    case "toggle":
      flag.updateFlag(notification.payload);
      break;
    case "deleted-flag":
      delete FlagCache[notification.payload];
      break;
    case "segment add":
      flag.addSegment(notification.payload.segment);
      break;
    case "segment remove":
      flag.removeSegment(notification.payload);
      break;
    case "segment body update":
      for (let f in FlagCache) {
        f.updateSegmentBody(notification.payload);
      }
      break;
    case "rule add":
      for (let f in FlagCache) {
        f.addRule(notification.payload);
      }
      break;
    case "rule remove":
      for (let f in FlagCache) {
        f.removeRule(notification.payload);
      }
      break;
    case "rule update":
      for (let f in FlagCache) {
        f.updateSegmentRule(notification.payload);
      }
      break;
  }

  console.log("message from stream: ", notification);
  console.log("flag cache: ", JSON.parse(JSON.stringify(FlagCache)));
};
