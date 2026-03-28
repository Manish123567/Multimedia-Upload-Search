import express from "express";
import multer from "multer";
import {
  uploadFile,
  searchFiles,
  incrementViews,
} from "../controllers/file.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

//  upload
router.post("/upload", authMiddleware, upload.single("file"), uploadFile);

//  search
router.get("/search", authMiddleware, searchFiles);

// increment views
router.patch("/:id/view", authMiddleware, incrementViews);

export default router;