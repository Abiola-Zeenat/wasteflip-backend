const express = require("express");
const router = express.Router();
const {
  validateCompany,
  createCompany,
  getCompanies,
  getCompanyById,
  getCompanyByName,
  updateCompany,
  deleteCompany,
} = require("../controllers/companies");

// TODO: Add the protect and admin middleware where necessary
router.post("/add", validateCompany, createCompany);
router.get("/all", getCompanies);
router.get("/:id", getCompanyById);
router.get("/name/:name", getCompanyByName);
router.put("/:id", validateCompany, updateCompany);
router.delete("/:id", deleteCompany);

module.exports = router;
