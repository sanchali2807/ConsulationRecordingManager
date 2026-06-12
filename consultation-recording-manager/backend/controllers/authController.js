const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const asyncHandler = require("../utils/asyncHandler");


const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
};



/**
 * Register User
 *
 * req.body:
 * {
 *   name,
 *   email,
 *   password
 * }
 *
 * returns:
 * user + jwt
 */
const registerUser = asyncHandler(
  async (req, res) => {

    const {
      name,
      email,
      password
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      res.status(400);
      throw new Error(
        "User already exists"
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await User.create({
        name,
        email,
        password: hashedPassword
      });

    res.status(201).json({
      success: true,

      token: generateToken(user),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  }
);


/**
 * Login User
 *
 * req.body:
 * {
 *   email,
 *   password
 * }
 *
 * returns:
 * jwt + user
 */
const loginUser = asyncHandler(
  async (req, res) => {

    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      res.status(401);
      throw new Error(
        "Invalid credentials"
      );
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      res.status(401);

      throw new Error(
        "Invalid credentials"
      );
    }

    res.json({
      success: true,

      token: generateToken(user),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  }
);


module.exports = {
  registerUser,
  loginUser
};