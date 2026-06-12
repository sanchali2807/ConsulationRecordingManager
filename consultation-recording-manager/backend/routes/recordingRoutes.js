const express =
  require("express");

const router =
  express.Router();

const {
  protect
} = require(
  "../middleware/authMiddleware"
);

const upload =
  require(
    "../middleware/uploadMiddleware"
  );

const {
  createRecording,getRecordings
} = require(
  "../controllers/recordingController"
);
router.get(
  "/",
  protect,
  getRecordings
);
router.post(
  "/",
  protect,
  upload.single("audio"),
  createRecording
);

module.exports =
  router;