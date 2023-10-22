import express from "express";
import * as attributeController from "../controllers/attributes.controller";

const router = express.Router();

router.get("/attributes", attributeController.getAllAttributes);
router.get("/attribute/:id", attributeController.getAttributeById);
router.post("/attributes", attributeController.createAttribute);
router.delete("/attributes/:id", attributeController.deleteAttribute);
router.patch("/attributes/:id", attributeController.updateAttribute);

export default router;
