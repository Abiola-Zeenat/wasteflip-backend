const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  generateRefreshToken,
  generateAccessToken,
  TOKENS_EXPIRY,
  refreshAccessToken,
} = require("../lib/constant/jwt");

// Register user
const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  // First registered user is an admin
  const firstAccount = (await User.countDocuments({})) === 0;
  const role = firstAccount ? "admin" : "user";

  const user = await User.create({ fullName, email, password, role });
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Set access token in cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: TOKENS_EXPIRY.ACCESS, // 15 minutes
  });

  // set refresh token in cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: TOKENS_EXPIRY.REFRESH, // 30days
  }),
    res.status(StatusCodes.CREATED).json({
      status: 201,
      message: "User created successfully",
      user: userToken,
    });
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError.UnauthenticatedError("Invalid email");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new CustomError.UnauthenticatedError("Invalid password");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set access token in cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: TOKENS_EXPIRY.ACCESS, // 15 minutes
    });

    // set refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: TOKENS_EXPIRY.REFRESH, // 30days
    }),
      res.status(StatusCodes.OK).json({
        status: 200,
        message: "User logged in successfully",
        user: userToken,
      });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Logout user
const logout = async (req, res) => {
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    expires: new Date(0), // Expire immediately
  });

  res.status(StatusCodes.OK).json({ message: "User logged out" });
};

const getSession = async (req, res) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      res.status(400).json({
        message: "Unauthorized, no access tokens provided",
      });
    }

    // If access token is available
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    let user = await User.findById(decoded.id).select("-password");

    if (user) {
      res.status(200).send({
        success: true,
        data: user,
        message: "User tokens valid",
      });
    } else {
      res.status(401).json({ message: " user not found" });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: `Error getting session: ${err.message}`,
    });
  }
};

module.exports = { register, login, logout, getSession };
