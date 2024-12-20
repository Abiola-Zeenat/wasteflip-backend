const { body, validationResult } = require("express-validator");

const handleErrorValidation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
// For signup
const validateSignup = [
  body("fullName").notEmpty().withMessage("Full Name is required"),
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  handleErrorValidation,
];

// For login
const validateLogin = [
  body("email").isEmail().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),

  handleErrorValidation,
];

module.exports = { validateSignup, validateLogin, handleErrorValidation };
