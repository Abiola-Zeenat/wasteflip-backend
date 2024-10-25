const Schedule = require("../models/schedule");

// Create a new schedule
const createSchedule = async (req, res) => {
  try {
    const {
      user,
      wasteType,
      date,
      size,
      quantity,
      frequency,
      contact,
      payment,
    } = req.body;

    const newSchedule = new Schedule({
      user,
      wasteType,
      date,
      size,
      quantity,
      frequency,
      contact,
      payment,
    });

    const savedSchedule = await newSchedule.save();

    res.status(201).json({
      success: true,
      data: savedSchedule,
      message: "Schedule created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get all schedules, optionally filtered whatever query filter & value
const getAllSchedules = async (req, res) => {
  try {
    const { filter , value } = req.query; 

    let query = { isArchived: false };
    if (filter && value) {
      query[filter] = new RegExp(value, "i");
    }
    // if (user) query.user = user;
    // if (status) query.status = status;
    // if (wasteType) query.wasteType = wasteType;

    // Fetch schedules and populate user, wasteType, and payment details
    const schedules = await Schedule.find(query)
      .populate("user", "fullName")
      .populate("wasteType", "name")
      .populate("payment", "total paymentMethod");

    if (schedules.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No schedules found",
      });
    }

    res.status(200).json({
      success: true,
      data: schedules,
      message: "Schedules retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get a schedule by ID
const getScheduleById = async (req, res) => {
  try {
    const { id } = req.params;

    const schedule = await Schedule.findOne({
      _id: id,
      isArchived: false,
    })
      .populate("user", "fullName")
      .populate("wasteType", "name")
      .populate("payment", "total paymentMethod");

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }

    res.status(200).json({
      success: true,
      data: schedule,
      message: "Schedule retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update a schedule
const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedSchedule = await Schedule.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedSchedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedSchedule,
      message: "Schedule updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// Soft delete a schedule by updating isArchived to true
const archiveSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const schedule = await Schedule.findById(id);

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }

    // Soft delete by updating the isArchived to true
    schedule.isArchived = true;
    await schedule.save();

    res.status(200).json({
      success: true,
      data: schedule,
      message: "Schedule archived successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  archiveSchedule,
};
