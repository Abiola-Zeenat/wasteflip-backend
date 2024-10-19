const mongoose = require("mongoose");

const WasteTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Wastetype = mongoose.model("Wastetype", WasteTypeSchema);
module.exports = Wastetype;
