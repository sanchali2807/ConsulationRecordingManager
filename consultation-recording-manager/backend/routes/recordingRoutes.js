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
  createRecording,
  getRecordings,
  getRecordingById,
  updateRecording,
  deleteRecording
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
router.get(
  "/:id",
  protect,
  getRecordingById
);
router.put(
  "/:id",
  protect,
  updateRecording
);

router.delete(
  "/:id",
  protect,
  deleteRecording
);
module.exports =
  router;