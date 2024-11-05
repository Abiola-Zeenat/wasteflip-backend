const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getSpecificUser,
  deleteUser,
  updateUser,
} = require("../controllers/user");
const { authenticate, authorize } = require("../middlewares/authentication");

router.get("/all", authenticate, authorize, getAllUsers);
router.get("/:id", authenticate, getSpecificUser);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, authorize, deleteUser);

module.exports = router;
