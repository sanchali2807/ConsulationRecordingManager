require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const authRoutes =
  require("./routes/authRoutes");
const {
  notFound,
  globalErrorHandler
} = require("./middleware/errorMiddleware");

const app = express();

/**
 * Connect database before
 * accepting requests.
 */
connectDB();

/**
 * Security headers
 */
app.use(helmet());

/**
 * Allow frontend requests
 */
app.use(
  cors({
    origin: process.env.FRONTEND_URL
  })
);

/**
 * Parse JSON request body
 */
app.use(express.json());

/**
 * Log requests
 */
app.use(morgan("dev"));

/**
 * Limit request spam
 */
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);

/**
 * Health check route
 */
app.get("/", (req, res) => {
  res.json({
    message: "API Running"
  });
});

/**
 * Route handlers will be
 * registered here later.
 */

/**
 * Must be after routes.
 */
app.use(
  "/api/auth",
  authRoutes
);
app.use(notFound);

/**
 * Last middleware.
 */
app.use(globalErrorHandler);

const PORT =
  process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});