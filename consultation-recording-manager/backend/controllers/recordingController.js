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


 
const getRecordings =
  asyncHandler(async (req, res) => {

    const {
      search = "",
      page = 1,
      limit = 5,
      status,
      dateFilter
    } = req.query;

    const query = {
      createdBy: req.user._id
    };

  
    if (search) {

      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i"
          }
        },
        {
          clientName: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    if (status) {

      query.status = status;
    }


    
    if (dateFilter === "7") {

      const sevenDaysAgo =
        new Date();

      sevenDaysAgo.setDate(
        sevenDaysAgo.getDate() - 7
      );

      query.createdAt = {
        $gte: sevenDaysAgo
      };
    }

    const total =
      await Recording.countDocuments(
        query
      );

    const recordings =
      await Recording.find(query)
        .sort({
          createdAt: -1
        })
        .skip(
          (page - 1) * limit
        )
        .limit(
          Number(limit)
        );

    res.json({
      recordings,
      total,
      currentPage:
        Number(page),

      totalPages:
        Math.ceil(
          total / limit
        )
    });
  });



const getRecordingById =
  asyncHandler(async (
    req,
    res
  ) => {

    const recording =
      await Recording.findById(
        req.params.id
      );

    if (!recording) {

      res.status(404);

      throw new Error(
        "Recording not found"
      );
    }

    res.json(recording);
  });


 
const updateRecording =
  asyncHandler(async (
    req,
    res
  ) => {

    const recording =
      await Recording.findById(
        req.params.id
      );

    if (!recording) {

      res.status(404);

      throw new Error(
        "Recording not found"
      );
    }

    recording.title =
  req.body.title ??
  recording.title;

recording.notes =
  req.body.notes ??
  recording.notes;

recording.tags =
  req.body.tags ??
  recording.tags;

recording.status =
  req.body.status ??
  recording.status;

      
    const updated =
      await recording.save();

    res.json(updated);
  });



const deleteRecording =
  asyncHandler(async (
    req,
    res
  ) => {

    const recording =
      await Recording.findById(
        req.params.id
      );

    if (!recording) {

      res.status(404);

      throw new Error(
        "Recording not found"
      );
    }

    await cloudinary.uploader.destroy(
      recording.cloudinaryPublicId,
      {
        resource_type:
          "video"
      }
    );

    await recording.deleteOne();

    res.json({
      success: true,
      message:
        "Recording deleted"
    });
  });

  module.exports={
    createRecording,
    getRecordings,
    getRecordingById,
    updateRecording,
    deleteRecording
  }