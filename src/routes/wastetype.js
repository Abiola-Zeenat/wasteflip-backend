const express = require("express");
const router = express.Router();

const {
  createWasteType,
  getAllWastetype,
  getById,
  getByName,
  updateWastetype,
  validateWastetype,
} = require("../controllers/wastetype");

router.post("/add", validateWastetype, createWasteType);
router.get("/all", getAllWastetype);
router.get("/:id", getById);
router.get("/name/:name", getByName);
router.put("/:id", validateWastetype, updateWastetype);

module.exports = router;
