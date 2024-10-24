const express = require("express");
const {
  createWasteType,
  getAllWastetype,
  getById,
  getByName,
  updatePricePerGallon,
} = require("../controllers/wastetype");
const router = express.Router();

router.post("/add", createWasteType);
router.get("/all", getAllWastetype);
router.get("/:id", getById);
router.get("/:name", getByName);
router.put("/:id", updatePricePerGallon);

module.exports = router;
