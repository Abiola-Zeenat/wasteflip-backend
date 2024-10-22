const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  enquiryType: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now() },
  size: { type: String },
  quantity: { type: String, required: true },
  frequency: { type: String, required: true },
  wasteType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wastetype",
    required: true,
  },
  contact: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String },
    email: { type: String },
  },
  status: {
    type: String,
    enum: ["In-progress", "completed"],
    default: "In-progress",
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
