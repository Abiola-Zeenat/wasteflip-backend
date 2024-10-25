const Payment = require("../models/payment");
const crypto = require("crypto");

// Create Payment
const createPayment = async (req, res) => {
  try {
    const { user, subTotal, serviceCharge, Total, paymentMethod } = req.body;

    const otp = crypto.randomInt(100000, 999999);

    const payment = new Payment({
      user,
      subTotal,
      serviceCharge,
      Total,
      paymentMethod,
      otp,
    });

    await payment.save();

    res.status(201).json({
      success: true,
      data: { payment, otp },
      message: "Payment created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { paymentId, otp } = req.body;

    // Find the payment by ID and check the OTP
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    if (payment.otp === otp) {
      // Mark the payment as "success"
      payment.status = "success";
      await payment.save();

      return res.status(200).json({
        success: true,
        message: "OTP verified and payment successful",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Payments (exclude soft deleted payments)
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ isDeleted: false }).populate(
      "user",
      "fullName email"
    );

    res.status(200).json({
      success: true,
      data: payments,
      message: "All payments retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Payment by ID (exclude soft deleted payments)
const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findOne({
      _id: id,
      isDeleted: false,
    }).populate("user", "fullName email");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: payment,
      message: "Payment retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Payment
const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const payment = await Payment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: payment,
      message: "Payment status updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Soft Delete Payment (Mark as isDeleted: true)
const archivePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findByIdAndUpdate(
      id,
      { isArchived: true },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: payment,
      message: "Payment archived successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentStatus,
  archivePayment,
  verifyOtp
};
