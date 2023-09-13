const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const fileupload = require("express-fileupload");
require("dotenv").config();
const path = require("path");

const PORT = 5000;

mongoose.connect(process.env.DB_CONNECTION_STRING);

const db = mongoose.connection;
db.on("error", (err) => {
  console.error(err);
});

var corsMiddleware = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //replace localhost with actual host
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PUT, PATCH, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Requested-With, Authorization"
  );

  next();
};

app.use(fileupload());
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "Server/build")));

// Route imports
const userRoute = require("./Routes/Auth");
const publicationsRoute = require("./Routes/Publications");

// Routes middlewares
app.use("/api/user", userRoute);
app.use("/api/publications", publicationsRoute);

//set port
app.listen(PORT, () => console.log("Server running on port", PORT));

// Routes
