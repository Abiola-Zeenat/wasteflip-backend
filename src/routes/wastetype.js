const express = require("express");
const {
  createWasteType,
  getAllWastetype,
  getSpecificWastetype,
} = require("../controllers/wastetype");
const router = express.Router();

router.post("/add", createWasteType);
router.get("/all", getAllWastetype);
router.get("/:id", getSpecificWastetype);


module.exports = router;