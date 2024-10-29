const { handleErrorValidation } = require("../middlewares/validateUser");
const { Wastetype, DropOff } = require("../models");
const { body } = require("express-validator");

const handleValidation = [
  body("name").trim().isEmpty().withMessage("name must be provided"),
  handleErrorValidation,
];

const createWasteType = async (req, res) => {
  try {
    const { name } = req.body;
    handleValidation;
    const wastetype = new Wastetype({ name });
    const savedWastetype = await wastetype.save();

    res.status(201).json({
      success: true,
      data: savedWastetype,
      message: "Wastetype created successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// get all wastetype
const getAllWastetype = async (req, res) => {
  try {
    const wastetypes = await Wastetype.find();

    res.status(200).json({
      success: true,
      data: wastetypes,
      message: "All wastetypes retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get waste type by id
const getSpecificWastetype = async (req, res) => {
  try {
    const { id } = req.params;
    const wasteType = await Wastetype.findById(id);

    // To list all dropoff locations for the specific wastetype
    const dropOffsHasWastetype = await DropOff.find({ wasteType: id });

    if (!wasteType) {
      return res.status(404).json({
        success: false,
        message: "Wastetype not found",
      });
    }

    res.status(200).json({
      success: true,
      data: { wasteType, dropOffsHasWastetype },
      message: "wasteType retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createWasteType,
  getAllWastetype,
  getSpecificWastetype,
};
