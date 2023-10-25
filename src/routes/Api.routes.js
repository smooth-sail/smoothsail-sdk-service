import express from "express";
import * as flagsController from "../controllers/flags.controller";

const router = express.Router();

// Flag API routes
router.get("/flags", flagsController.getAllFlags);

// SSE API routes
router.get("/ff-updates-stream", flagsController.sseNotifications);

export default router;
