const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const PORT = 5000

mongoose.connect(process.env.DB_CONNECTION_STRING);

const db = mongoose.connection;
db.on("error", (err) => {
  console.error(err);
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route imports
const userRoute = require("./Routes/Auth");

// Routes middlewares
app.use("/api/user", userRoute);

//set port
app.listen(PORT, () => console.log("Server running on port", PORT));

// Routes
