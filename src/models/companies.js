const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.String, required: true, unique: true },
  address: [
    {
      street: { type: mongoose.Schema.Types.String },
      city: { type: mongoose.Schema.Types.String },
      state: { type: mongoose.Schema.Types.String },
    },
  ],
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
