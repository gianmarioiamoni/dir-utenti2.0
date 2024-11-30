import express from "express";
import { upload } from "../config/cloudinaryConfig";
import {uploadFile} from "../controllers/uploadControllers"

const router = express.Router();

// Endpoint per l'upload di immagini
router.post("/", upload.single("file"), uploadFile);

export default router;
