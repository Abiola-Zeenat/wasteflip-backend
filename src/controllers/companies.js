const Company = require("../models/companies");
const { body } = require("express-validator");
const { handleErrorValidation } = require("../middlewares/validateUser");

const validateCompany = [
  body("name", "Company name is required").notEmpty(),
  body("address.*.street").notEmpty().withMessage("Street is required"),
  body("address.*.city").notEmpty().withMessage("City is required"),
  body("address.*.state").notEmpty().withMessage("State is required"),
  handleErrorValidation,
];

// CREATE COMPANY
const createCompany = async (req, res) => {
  try {
    const { name, address } = req.body;

    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      return res.status(400).json({ message: "Company already exists" });
    }

    const newCompany = new Company({
      name,
      address,
    });

    await newCompany.save();

    res.status(201).json({
      success: true,
      data: newCompany,
      message: "Company created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error creating company: ${err.message}`,
    });
  }
};

// GET ALL COMPANIES
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json({
      success: true,
      data: companies,
      message: "Companies fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error fetching companies: ${err.message}`,
    });
  }
};

// GET COMPANY BY ID
const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({
      success: true,
      data: company,
      message: "Company fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching company",
    });
  }
};

// Get Company by Name (case-insensitive)
const getCompanyByName = async (req, res) => {
  const { name } = req.params;

  try {
    const company = await Company.findOne({
      name: { $regex: new RegExp("^" + name + "$", "i") },
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      data: company,
      message: "Company fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// UPDATE COMPANY
const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCompany = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({
      success: true,
      data: updatedCompany,
      message: "Company updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error updating company : ${err.message}`,
    });
  }
};

// DELETE COMPANY
const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCompany = await Company.findByIdAndDelete(id);
    if (!deletedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error deleting company : ${err.message}`,
    });
  }
};

module.exports = {
  validateCompany,
  createCompany,
  getCompanies,
  getCompanyById,
  getCompanyByName,
  updateCompany,
  deleteCompany,
};
