const jwt = require("jsonwebtoken");

const User = require("../models/User");

const asyncHandler =
  require("../utils/asyncHandler");


const protect = asyncHandler(
  async (req, res, next) => {

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {

      token =
        req.headers.authorization.split(
          " "
        )[1];

      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );

      req.user =
        await User.findById(
          decoded.id
        ).select("-password");

      return next();
    }

    res.status(401);

    throw new Error(
      "Not authorized"
    );
  }
);

module.exports = {
  protect
};