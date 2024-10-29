const { body, query } = require("express-validator");
const { handleErrorValidation } = require("../middlewares/validateUser");

const validateDropOff = [
  body("name", "Name is required").notEmpty(),
  body("img", "Image URL is required").notEmpty(),
  body("wasteType", "Waste types must be an array").isArray(),
  body("location.coordinates")
    .isArray({ min: 2, max: 2 })
    .withMessage("Coordinates required and must be an array of 2 numbers"),

  handleErrorValidation,
];

const validateNearbyQuery = [
  query("address")
    .optional()
    .isString()
    .withMessage("Address must be a string"),
  query("longitude")
    .optional()
    .isNumeric()
    .withMessage("Longitude must be a number"),
  query("latitude")
    .optional()
    .isNumeric()
    .withMessage("Latitude must be a number"),
  query("maxDistance")
    .notEmpty()
    .withMessage("Max distance is required")
    .isNumeric(),

  handleErrorValidation,
];

module.exports = { validateDropOff, validateNearbyQuery };
