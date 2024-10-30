const mongoose = require("mongoose");

const dropOffSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  distance: { type: Number }, // Will be calculated dynamically
  img: { type: String, required: true },
  wasteType: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Wastetype", required: true },
  ],
  location: {
    type: {
      type: String, // Always 'Point'
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (coords) {
          return coords.length === 2;
        },
        message:
          "Coordinates should be an array of two numbers [longitude, latitude]",
      },
    },
  },
});
dropOffSchema.index({ "location.coordinates": "2dsphere" }); // Enable geospatial queries

const DropOff = mongoose.model("DropOff", dropOffSchema);

module.exports = DropOff;
