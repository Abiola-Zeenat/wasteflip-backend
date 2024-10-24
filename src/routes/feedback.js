const express = require("express");
const router = express.Router();
const {
  validateFeedback,
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
} = require("../controllers/feedback");

// TODO: Add the protect and admin middleware where necessary
router.post("/add", validateFeedback, createFeedback);
router.get("/all", getAllFeedbacks);
router.get("/:id", getFeedbackById);
router.put("/:id", validateFeedback, updateFeedback);
router.delete("/:id", deleteFeedback);

module.exports = router;
