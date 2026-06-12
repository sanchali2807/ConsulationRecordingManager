const streamifier =
  require("streamifier");

const Recording =
  require("../models/Recording");

const cloudinary =
  require("../config/cloudinary");

const asyncHandler =
  require("../utils/asyncHandler");


  const createRecording =
  asyncHandler(
    async (req, res) => {

      if (!req.file) {

        res.status(400);

        throw new Error(
          "Audio file required"
        );
      }

      const uploadResult =
        await new Promise(
          (resolve, reject) => {

            const stream =
              cloudinary.uploader.upload_stream(
                {
                  resource_type:
                    "video",

                  folder:
                    "consultations"
                },

                (
                  error,
                  result
                ) => {

                  if (error)
                    reject(error);

                  resolve(
                    result
                  );
                }
              );

            streamifier
              .createReadStream(
                req.file.buffer
              )
              .pipe(stream);
          }
        );

      const recording =
        await Recording.create(
          {
            title:
              req.body.title,

            clientName:
              req.body.clientName,

            duration:
              req.body.duration ||
              0,

            recordingUrl:
              uploadResult.secure_url,

            cloudinaryPublicId:
              uploadResult.public_id,

            createdBy:
              req.user._id
          }
        );

      res.status(201).json(
        recording
      );
    }
  );


  /**
 * Get all recordings
 */
const getRecordings =
  asyncHandler(
    async (req, res) => {

      const recordings =
        await Recording
          .find({
            createdBy:
              req.user._id
          })
          .sort({
            createdAt: -1
          });

      res.json(
        recordings
      );
    }
  );
  module.exports={
    createRecording,
    getRecordings
  }