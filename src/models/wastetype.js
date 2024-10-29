const mongoose = require("mongoose");

const WasteTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true, },
  pricePerGallon: { type: Number, required: true },
});

const Wastetype = mongoose.model("Wastetype", WasteTypeSchema);
module.exports = Wastetype;
