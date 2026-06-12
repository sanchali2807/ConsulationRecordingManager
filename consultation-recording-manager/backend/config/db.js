const mongoose = require("mongoose");

/**
 * Connects application to MongoDB.
 */
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("MongoDB Connected");
};

module.exports = connectDB;