const { body } = require("express-validator");
const { handleErrorValidation } = require("../middlewares/validateUser");

const validateCreatePayment = [
  body("user", "User ID is required").notEmpty(),
  body("subTotal", "SubTotal must be a number").isNumeric(),
  body("serviceCharge", "Service charge must be a number").isNumeric(),
  body("Total", "Total must be a number").isNumeric(),
  body("paymentMethod", "Payment method is required")
    .notEmpty()
    .isIn(["Credit card", "transfer"])
    .withMessage("Payment method must be 'Credit card' or 'transfer'"),
  body("status")
    .optional()
    .isIn(["processing", "failed", "success"])
    .withMessage("Status must be 'processing', 'failed', or 'success'"),
  handleErrorValidation,
];

const validateUpdatePayment = [
  body("status")
    .optional()
    .isIn(["processing", "failed", "success"])
    .withMessage("Status must be 'processing', 'failed', or 'success'"),
  handleErrorValidation,
];

module.exports = { validateCreatePayment, validateUpdatePayment };
