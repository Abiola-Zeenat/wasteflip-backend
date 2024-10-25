const express = require("express");
const router = express.Router();
const {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentStatus,
  archivePayment,
} = require("../controllers/payment");
const {
  validateCreatePayment,
  validateUpdatePayment,
} = require("../middlewares/validatePayment");

// TODO: Add the protect and admin middleware where necessary
router.post("/add", validateCreatePayment, createPayment);
router.get("/all", getAllPayments);
router.get("/:id", getPaymentById);
router.put("/:id", validateUpdatePayment, updatePaymentStatus);
router.delete("/:id", archivePayment);

module.exports = router;
