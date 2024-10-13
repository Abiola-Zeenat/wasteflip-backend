require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/db");

const app = express();


app.use(cookieParser());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Database connection to the server before starting the server
const port = process.env.PORT || 3005;

const start = async () => {
  try{
    await connectDB(process.env.MONGO_URI);
    app.listen(port , () => 
    console.log(`Wasteflip server started and listening on ${port}`)
    );
  }catch(error){
    console.log(error);
  }

};

start();
