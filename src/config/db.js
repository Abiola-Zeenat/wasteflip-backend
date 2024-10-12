const mongoose = require("mongoose");

//Connects to the database 
const connectDB = (url) => {
  return mongoose.connect(url);
};
module.exports = connectDB;
