require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/db");
const wasteRouter = require("./src/routes/wastetype");
const companyRouter = require("./src/routes/company");
const feedbackRouter = require("./src/routes/feedback");
const paymentRouter = require("./src/routes/payment");
const scheduleRouter = require("./src/routes/schedule");
const dropOffRouter = require("./src/routes/dropoff");

const app = express();

app.use(cookieParser());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/wastetype", wasteRouter);
app.use("/api/company", companyRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/api/dropoff", dropOffRouter);

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
