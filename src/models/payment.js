const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subTotal: { type: Number, required: true },
  serviceCharge: { type: Number, required: true },
  Total: { type: Number, required: true },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["Credit card", "transfer "],
  },
  status: {
    type: String,
    enum: ["processing", "failed", "success"],
    default: "processing",
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
