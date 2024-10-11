const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to db successfully");
  } catch (err) {
    console.error(`Error connecting to db: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;