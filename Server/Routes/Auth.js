const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PW,
  },
});

//Email route to setup password
router.post("/mail", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return res
      .status(400)
      .json({ error: "An account with this email already exists." });
  }
  const token = jwt.sign(
    { firstName: firstName, lastName: lastName, email: email },
    process.env.SECRET_ACCESS_TOKEN
  );
  generatedURL = `http://localhost:3000/setpassword?token=${token}`;

  const html = `
      <p>Hi, ${firstName + " " + lastName}</p>
      <p>Use the below link to set a password</p>  
      <a href = "${generatedURL}">${generatedURL}</a>
      `;
  try {
    const sent = await transporter.sendMail({
      from: "focus.app123@gmail.com",
      to: email,
      subject: "Setup Password",
      html,
    });

    res.status(201).json({ error: "" });
    console.log({ sent });
  } catch (error) {
    //for cors
    res.status(400).json({ error });
    console.log(error);
  }
});

//Register User route
router.post("/register", async (req, res) => {
  const { token, password, isAdmin } = req.body;
  decoded = jwt.decode(token, process.env.SECRET_ACCESS_TOKEN);
  console.log("decoded", decoded);
  const emailExist = await User.findOne({ email: decoded.email });
  if (emailExist) {
    return res
      .status(400)
      .json({ error: "An account with this email already exists." });
  }

  //hashing pw
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    firstName: decoded.firstName,
    lastName: decoded.lastName,
    password: hashedPassword,
    email: decoded.email,
    isAdmin,
  });

  try {
    newUser = await user.save();
    res.status(201).json({ error: "" });
    console.log("Password Set Successfully");
  } catch (error) {
    res.status(400).json({ error });
  }
});

//Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //checking for existing email
  const user = await User.findOne({ email });
  if (!user) {
    //for cors
    return res.status(400).json({ error: "Incorrect email or password." });
  }

  //pw validation
  const validPw = await bcrypt.compare(password, user.password);
  if (!validPw) {
    return res.status(400).json({ error: "Incorrect email or password." });
  }

  res.status(201).json({ error: "", isAdmin: user.isAdmin, user: user });
});

// Delete User
router.delete("/delete", async (req, res) => {
  const { email } = req.body;
  try {
    deleted = await User.deleteOne({ email: email });
    console.log(deleted);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// Reset Password
router.post("/resetpassword", async (req, res) => {
  const { oldPassword, newPassword, email } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });
  const validPw = await bcrypt.compare(oldPassword, user.password);
  if (!validPw) {
    return res.status(400).json({ error: "Incorrect Password, try again." });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    let output = await User.updateOne(
      { email: email },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
    return res.status(200).json(output);
  }
});

//make admin
router.post("/makeAdmin", async (req, res) => {
  const { objectID, email } = req.body;
  const admin = await User.findOne({ _id: objectID });

  if (!admin.isAdmin) {
    return res.status(400).json({ error: "Access Denied" });
  } else {
    let output = await User.updateOne(
      { email: email },
      {
        $set: {
          isAdmin: true,
        },
      }
    );
    console.log(output);
    return res.status(200).json(output);
  }
});
//delete admin
router.post("/removeAdmin", async (req, res) => {
  const { objectID, email } = req.body;
  const admin = await User.findOne({ _id: objectID });
  if (!admin.isAdmin) {
    return res.status(403).json({ error: "Access Denied" });
  } else {
    let output = await User.updateOne(
      { email: email },
      {
        $set: {
          isAdmin: false,
        },
      }
    );
    console.log(output);
    return res.status(200).json(output);
  }
});

//All Users
router.post("/allusers", async (req, res) => {
  const { objectID } = req.body;
  if (objectID) {
    const user = await User.findOne({ _id: objectID });
    if (!user.isAdmin) {
      return res.status(403).json({ error: "Access Denied" });
    } else {
      let output = await User.find();
      return res.status(200).json({ output });
    }
  } else {
    return res.status(400).json({ error: "No params received" });
  }
});
module.exports = router;
