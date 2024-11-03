const { geocodeAddress } = require("../lib/constant/geocode");
const DropOff = require("../models/dropoff");

// Create a new dropoff location
const createDropOff = async (req, res) => {
  try {
    const { name, img, wasteType, location } = req.body;

    const exist = await DropOff.findOne({ name });
    if (exist)
      return res.status(400).json({ message: "Dropoff already exists" });

    const newDropOff = new DropOff({
      name,
      img,
      wasteType,
      location: {
        type: "Point",
        coordinates: location.coordinates,
      },
    });

    const savedDropOff = await newDropOff.save();
    res.status(201).json({
      success: true,
      data: savedDropOff,
      message: "Dropoff location created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get all dropoff locations
const getAllDropOffs = async (req, res) => {
  try {
    const dropOffs = await DropOff.find().populate("wasteType", "name");

    res.status(200).json({
      success: true,
      data: dropOffs,
      message: "All dropoff locations retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get a specific dropoff location by ID
const getDropOffById = async (req, res) => {
  try {
    const { id } = req.params;
    const dropOff = await DropOff.findById(id).populate("wasteType", "name");

    if (!dropOff) {
      return res.status(404).json({
        success: false,
        message: "Dropoff location not found",
      });
    }

    res.status(200).json({
      success: true,
      data: dropOff,
      message: "Dropoff location retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update a dropoff location by ID
const updateDropOff = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedDropOff = await DropOff.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedDropOff) {
      return res.status(404).json({
        success: false,
        message: "Dropoff location not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedDropOff,
      message: "Dropoff location updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// delete a dropoff location by ID
const deleteDropOff = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDropOff = await DropOff.findByIdAndDelete(id);

    if (!deletedDropOff) {
      return res.status(404).json({
        success: false,
        message: "Dropoff location not found",
      });
    }

    res.status(200).json({
      success: true,
      data: deletedDropOff,
      message: "Dropoff location deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Filter dropoff locations based on proximity to user's location
const getNearbyDropOffs = async (req, res) => {
  try {
    const { address, longitude, latitude, maxDistance } = req.query;

    let userCoordinates;
    if (address) {
      userCoordinates = await geocodeAddress(address); // Assume this returns { longitude, latitude }
    } else if (longitude && latitude) {
      userCoordinates = {
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
      };
    } else {
      return res.status(400).json({
        success: false,
        message: "Either address or coordinates must be provided.",
      });
    }

    const nearbyDropOffs = await DropOff.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [userCoordinates.longitude, userCoordinates.latitude],
          },
          distanceField: "distance", // calculated distance
          maxDistance: maxDistance * 1609.34, // Convert meters to miles
          spherical: true,
        },
      },
      {
        $lookup: {
          from: "wastetypes",
          localField: "wasteType",
          foreignField: "_id",
          as: "wasteType",
        },
      },
    ]);

    // to update each DropOff with the calculated distance
    for (let dropOff of nearbyDropOffs) {
      await DropOff.findByIdAndUpdate(dropOff._id, {
        distance: dropOff.distance,
      });
    }

    res.status(200).json({
      success: true,
      data: nearbyDropOffs,
      message:
        "Nearby drop-off locations retrieved and distances calculated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createDropOff,
  getAllDropOffs,
  getDropOffById,
  updateDropOff,
  deleteDropOff,
  getNearbyDropOffs,
};
