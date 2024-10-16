const mongoose = require("mongoose");

const WasteTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const WasteType = mongoose.model("WasteType", WasteTypeSchema);
module.exports = WasteType;
