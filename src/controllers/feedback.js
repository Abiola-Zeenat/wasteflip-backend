const Feedback = require("../models/feedback");
const { body } = require("express-validator");
const { handleErrorValidation } = require("../middlewares/validateUser");

const validateFeedback = [
  body("message", "feedback message is required").notEmpty(),
  body("user", "User ID is required").notEmpty(),
  handleErrorValidation,
];

// Create Feedback
const createFeedback = async (req, res) => {
  try {
    const { user, message } = req.body;

    // Check if feedback message already exists
    const existingFeedback = await Feedback.findOne({ message });
    if (existingFeedback) {
      return res.status(400).json({
        success: false,
        message: "Feedback with the same message already exists",
      });
    }

    const feedback = new Feedback({
      user,
      message,
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      data: feedback,
      message: "Feedback created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Feedbacks
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("user", "fullName email");

    res.status(200).json({
      success: true,
      data: feedbacks,
      message: "All feedbacks retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Feedback by ID
const getFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findById(id).populate("user", "fullName");

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      success: true,
      data: feedback,
      message: "Feedback retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Feedback
const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { message },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      success: true,
      data: feedback,
      message: "Feedback updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Feedback
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      success: true,
      data: feedback,
      message: "Feedback deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  validateFeedback,
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
};
