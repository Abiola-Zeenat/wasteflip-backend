const express = require("express");
const {
  createWasteType,
  getAllWastetype,
  getSpecificWastetype,
  updatePricePerGallon,
} = require("../controllers/wastetype");
const router = express.Router();

router.post("/add", createWasteType);
router.get("/all", getAllWastetype);
router.get("/:id", getSpecificWastetype);
router.put("/:id", updatePricePerGallon);

module.exports = router;
