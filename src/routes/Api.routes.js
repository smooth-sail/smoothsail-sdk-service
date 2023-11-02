import express from "express";
import * as flagsController from "../controllers/flags.controller";
// import { handleUpdateNotification } from "../utils/flags";
// import FlagCache from "../cache/flagCache";

const router = express.Router();

// route for SDK to fetch flags - no longer needed
// router.get("/flags", flagsController.getAllFlags);

// SSE API routes
router.get("/ff-updates-stream", flagsController.sseNotifications);

// test subscriber
// router.post("/flagUpdates", (req, res) => {
//   handleUpdateNotification(req.body);

//   // write to SSE stream

//   // flags logged & sent back for POSTman tests
//   console.log("flag data: ", FlagCache);
//   res.status(200).json({ flags: FlagCache });
// });

export default router;
