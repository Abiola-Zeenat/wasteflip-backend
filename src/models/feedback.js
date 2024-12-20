const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true, unique: true },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
