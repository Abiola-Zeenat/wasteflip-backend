const { handleErrorValidation } = require("../middlewares/validateUser");
const { Wastetype, DropOff } = require("../models");
const { body } = require("express-validator");

const handleValidation = [
  body("name").notEmpty().withMessage("name must be provided"),
  body("pricePerGallon", "Price must be provided")
    .notEmpty()
    .isNumeric()
    .withMessage("Price must be a number"),
  handleErrorValidation,
];

const createWasteType = async (req, res) => {
  try {
    const { name, pricePerGallon } = req.body;
    handleValidation;
    const wastetype = new Wastetype({ name, pricePerGallon });
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
const getById = async (req, res) => {
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

const getByName = async (req, res) => {
  const { name } = req.params;

  try {
    const wastetype = await Wastetype.findOne({
      name: { $regex: new RegExp("^" + name + "$", "i") }
    });

    if (!wastetype) {
      return res.status(404).json({
        success: false,
        message: "Wastetype not found"
      });
    }

    res.status(200).json({
      success: true,
      data: wastetype,
      message: "Wastetype fetched successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// to update wastetype price per gallon
const updatePricePerGallon = async (req, res) => {
  try {
    const { id } = req.params;
    const wastetype = await Wastetype.findById(id);

    if (wastetype) {
      wastetype.pricePerGallon = req.body.pricePerGallon;
      wastetype._id = id;
    }
    handleValidation;
    const updatedWastetype = await wastetype.save();

    res.status(200).json({
      success: true,
      data: updatedWastetype,
      message: "Wastetype pricePerGallon updated successfully",
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
  getById,
  getByName,
  updatePricePerGallon,
};
