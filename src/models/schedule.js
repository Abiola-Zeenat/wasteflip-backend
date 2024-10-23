const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  scheduleItems: [
    {
      wasteType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wastetype",
        required: true,
      },
      date: { type: Date, required: true, default: Date.now() },
      size: { type: String },
      quantity: { type: String, required: true },
      frequency: { type: String, required: true },
    },
  ],
  contact: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
  },
  subTotal: { type: Number, required: true },
  serviceCharge: { type: Number, required: true },
  Total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["In-progress", "completed"],
    default: "In-progress",
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
