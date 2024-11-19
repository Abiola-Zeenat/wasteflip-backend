const User = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // returns user without password
    res.status(200).json({
      success: true,
      data: users,
      message: "All Users retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error Fetching Users: ${err.message}`,
    });
  }
};

const getSpecificUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (user) {
      return res.status(200).json({
        success: true,
        data: user,
        message: "User retrieved successfully",
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error Fetching User: ${err.message}`,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: `The user with id of ${id} was not found` });
    }

    res.status(200).json({
      success: true,
      data: updatedUser,
      message: "User updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error deleting User: ${err.message}`,
    });
  }
};

module.exports = { getAllUsers, getSpecificUser, deleteUser, updateUser };
