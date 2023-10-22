import express from "express";
import * as segmentController from "../controllers/segments.controller";

const router = express.Router();

router.get("/segments", segmentController.getAllSegments);
router.get("/segment/:id", segmentController.getSegmentById);
router.post("/segments", segmentController.createSegment);
router.delete("/segments/:id", segmentController.deleteSegment);
router.patch("/segments/:id", segmentController.updateSegment);

export default router;
