const mongoose = require("mongoose");

const dropOffSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.String, required: true, unique: true },
  distance: { type: mongoose.Schema.Types.String },
  img: { type: mongoose.Schema.Types.String, required: true },
  wasteType: [
    { type: Schema.Types.ObjectId, ref: "Wastetype", required: true },
  ],
});

const DropOff = mongoose.model("DropOff", dropOffSchema);

module.exports = DropOff;
