const mongoose =
  require("mongoose");

const recordingSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true
      },

      clientName: {
        type: String,
        required: true
      },

      recordingUrl: {
        type: String,
        required: true
      },

      cloudinaryPublicId: {
        type: String,
        required: true
      },

      duration: {
        type: Number,
        default: 0
      },

      notes: {
        type: String,
        default: ""
      },

      tags: {
        type: [String],
        default: []
      },

      status: {
        type: String,
        enum: [
          "active",
          "archived"
        ],
        default: "active"
      },

      createdBy: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",

        required: true
      }
    },
    {
      timestamps: true
    }
  );

module.exports =
  mongoose.model(
    "Recording",
    recordingSchema
  );