const { body } = require("express-validator");
const { handleErrorValidation } = require("../middlewares/validateUser");

const validateSchedule = [
  body("user").notEmpty().withMessage("User is required"),
  body("wasteType").notEmpty().withMessage("WasteType is required"),
  body("quantity").notEmpty().withMessage("Quantity is required"),
  body("frequency").notEmpty().withMessage("Frequency is required"),
  body("contact.firstName").notEmpty().withMessage("First Name is required"),
  body("contact.lastName").notEmpty().withMessage("Last Name is required"),
  body("contact.phoneNumber")
    .notEmpty()
    .withMessage("Phone Number is required")
    .isMobilePhone("en-NG")
    .withMessage("Please provide a valid Nigerian phone number"),
  body("contact.address").notEmpty().withMessage("Address is required"),
  handleErrorValidation,
];

module.exports = { validateSchedule };
