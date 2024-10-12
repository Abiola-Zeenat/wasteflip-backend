const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  enquiryType: { type: mongoose.Schema.Types.String, required: true },
  date: { type: mongoose.Schema.Types.String, required: true },
  size: { type: mongoose.Schema.Types.String, required: true },
  quantity: { type: mongoose.Schema.Types.String, required: true },
  frequency: { type: mongoose.Schema.Types.String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
