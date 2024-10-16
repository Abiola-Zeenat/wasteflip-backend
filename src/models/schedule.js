const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  enquiryType: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now() },
  size: { type: String },
  quantity: { type: String, required: true },
  frequency: { type: String, required: true },
  contact: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String },
    email: { type: String },
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
