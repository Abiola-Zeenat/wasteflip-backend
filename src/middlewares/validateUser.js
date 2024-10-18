const { body, validationResult } = require("express-validator");

const handleErrorValidation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};
// For signup
const validateSignup = [
  body("fullName").not().isEmpty().withMessage("Full Name is required"),
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  handleErrorValidation,
];

// For login
const validateLogin = [
  body("email").isEmail().withMessage("Email is required"),
  body("password").not().isEmpty().withMessage("Password is required"),

  handleErrorValidation,
];

module.exports = { validateSignup, validateLogin, handleErrorValidation };
