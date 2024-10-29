const express = require("express");
const router = express.Router();
const {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  archiveSchedule,
} = require("../controllers/schedule");
const { validateSchedule } = require("../middlewares/validateSchedule");

// TODO: Add the protect and admin middleware where necessary
router.post("/add", validateSchedule, createSchedule);
router.get("/all", getAllSchedules);
router.get("/:id", getScheduleById);
router.put("/:id", validateSchedule, updateSchedule);
router.delete("/:id", archiveSchedule);

module.exports = router;
