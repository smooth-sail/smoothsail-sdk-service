import FlagCache from "../cache/flagCache";
import { Flag } from "../models/Flag";

export const handleUpdateNotification = (notification) => {
  let flag = FlagCache[notification.payload["fKey"]];
  switch (notification.type) {
    case "new-flag":
      FlagCache[notification.payload["fKey"]] = new Flag(notification.payload);
      break;
    case "toggle":
      flag.updateFlag(notification.payload);
      break;
    case "deleted-flag":
      delete FlagCache[notification.payload];
      break;
    case "segment add":
      flag.addSegment(notification.payload.plainSegment);
      break;
    case "segment remove":
      flag.removeSegment(notification.payload);
      break;
    case "segment body update":
      for (let f in FlagCache) {
        FlagCache[f].updateSegmentBody(notification.payload);
      }
      break;
    case "rule add":
      for (let f in FlagCache) {
        FlagCache[f].addRule(notification.payload);
      }
      break;
    case "rule remove":
      for (let f in FlagCache) {
        FlagCache[f].removeRule(notification.payload);
      }
      break;
    case "rule update":
      for (let f in FlagCache) {
        FlagCache[f].updateSegmentRule(notification.payload);
      }
      break;
  }

  console.log("message from stream: ", notification);
  console.log("flag cache: ", JSON.parse(JSON.stringify(FlagCache)));
  // additional logs to see segments and rules updated in flag 1
  console.log("flag 1: ", JSON.parse(JSON.stringify(FlagCache["flag-1"])));
  console.log(
    "flag 1 rules: ",
    JSON.parse(JSON.stringify(FlagCache["flag-1"].segments[0]))
  );
};

export const addFlagsToCache = (data) => {
  for (let flag in data) {
    FlagCache[flag] = new Flag(data[flag]);
  }
};
