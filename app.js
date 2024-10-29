require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

//packages 
const logger = require("morgan");
const cookieParser = require("cookie-parser");


// database
const connectDB = require("./src/config/db");

// routers 
const authRouter = require('./src/routes/authRouter');

//middlewares 
const errorHandlerMiddleware = require('./src/middlewares/error-handler')
const notFoundMiddleware = require('./src/middlewares/not-found')

app.use(cookieParser( process.env.JWT_ACCESS_SECRET));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);




//Database connection to the server before starting the server
const port = process.env.PORT || 3005;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to db successfully");

    app.listen(port, () =>
      console.log(`Wasteflip server started and listening on ${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
