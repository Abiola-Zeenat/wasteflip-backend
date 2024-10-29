const express = require("express");
const router = express.Router();
const {
  createDropOff,
  getAllDropOffs,
  getDropOffById,
  updateDropOff,
  deleteDropOff,
  getNearbyDropOffs,
} = require("../controllers/dropoff");
const {
  validateDropOff,
  validateNearbyQuery,
} = require("../middlewares/validateDropoff");

router.post("/add", validateDropOff, createDropOff);
router.get("/all", getAllDropOffs);
router.get("/nearby", validateNearbyQuery, getNearbyDropOffs);
router.get("/:id", getDropOffById);
router.put("/:id", validateDropOff, updateDropOff);
router.delete("/:id", deleteDropOff);

module.exports = router;
