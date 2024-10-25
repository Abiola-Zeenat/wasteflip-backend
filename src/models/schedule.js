const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  wasteType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wastetype",
    required: true,
  },
  date: { type: Date, required: true, default: Date.now() },
  size: { type: String },
  quantity: { type: String, required: true },
  frequency: { type: String, required: true },

  contact: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "rejected", "completed"],
    default: "pending",
  },
  isArchived: { type: Boolean, default: false },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
