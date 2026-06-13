require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const authRoutes =
  require("./routes/authRoutes");
  const recordingRoutes =
require("./routes/recordingRoutes");
const {
  notFound,
  globalErrorHandler
} = require("./middleware/errorMiddleware");

const app = express();


connectDB();


app.use(helmet());


app.use(
  cors({
    origin: process.env.FRONTEND_URL
  })
);


app.use(express.json());


app.use(morgan("dev"));


app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);


app.get("/", (req, res) => {
  res.json({
    message: "API Running"
  });
});


app.use(
  "/api/auth",
  authRoutes
);
app.use(
  "/api/recordings",
  recordingRoutes
);
app.use(notFound);


app.use(globalErrorHandler);

const PORT =
  process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});