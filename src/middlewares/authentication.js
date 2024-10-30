const CustomError = require("../errors");
const { generateRefreshToken } = require("../lib/constant/jwt");

const authenticate = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }

  try {
    const { name, userId, role } = generateRefreshToken({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

const authorize = async(req, res, next) => {
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
