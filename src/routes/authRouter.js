const express = require("express");
const router = express.Router();
const { register, login, logout, getSession } = require("../controllers/auth");
const {
  validateSignup,
  validateLogin,
} = require("../middlewares/validateUser");
const { authenticate } = require("../middlewares/authentication");

router.post("/register", validateSignup, register);
router.post("/login", validateLogin, login);
router.get("/logout", authenticate, logout); // is this suppose to be a get or post route
router.get("/session", getSession);

module.exports = router;
