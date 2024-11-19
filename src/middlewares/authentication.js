const CustomError = require("../errors");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (user) {
      req.user = user;
      next();
    }
  } catch (error) {
    res
      .status(401)
      .json({ message: `Not authorized, token failed: ${error.message}` });
  }
};

const authorize = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    throw new CustomError.UnauthenticatedError(
      "Unauthorized to access this route"
    );
  }
  //   return (req, res, next) => {
  //     if (!roles.includes(req.user.role)) {
  //       throw new CustomError.UnauthenticatedError(
  //         "Unauthorized to access this route"
  //       );
  //     }
  //     next();
  //   };
};

module.exports = {
  authenticate,
  authorize,
};
