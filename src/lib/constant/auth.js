const jwt = require("jsonwebtoken");
const User = require("../../models/user");

const ACCESS_TOKEN_EXPIRY = 1000 * 60 * 15; // 15 minutes in milliseconds;
const REFRESH_TOKEN_EXPIRY = 1000 * 60 * 60 * 24 * 30; // 30 days in milliseconds;

const TOKENS_EXPIRY = {
  ACCESS: ACCESS_TOKEN_EXPIRY,
  REFRESH: REFRESH_TOKEN_EXPIRY,
};

// Helper function to generate access token
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: TOKENS_EXPIRY.ACCESS / 1000 } // Expiry in seconds
  );
};

// Helper function to generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: TOKENS_EXPIRY.REFRESH / 1000, // Expiry in seconds
    }
  );
};

// Helper function to refresh access token when expired and refresh token still available
const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a new access token
    const accessToken = generateAccessToken(user);

    // Set the new access token as a cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: TOKENS_EXPIRY.ACCESS,
    });

    res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

module.exports = {
  TOKENS_EXPIRY,
  generateAccessToken,
  generateRefreshToken,
  refreshAccessToken,
};
