const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PW,
  },
});

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
  generatedURL = `http://localhost:5000/setpassword?token=${token}`;

  const html = `
      <p>Hi, ${firstName + " " + lastName}</p>
      <p>Use the below link to set a password</p>  
      <a href = "${generatedURL}">${generatedURL}</a>
      `;
  try {
    // newUser = await user.save();

    const sent = await transporter.sendMail({
      from: "focus.app123@gmail.com",
      to: email,
      subject: "Setup Password",
      html,
    });
    res.status(201).json({ error: "" });
    console.log({ sent });
  } catch (error) {
    res.status(400).json({ error });
  }
  
});

router.post("/register", async (req, res) => {
  const { token, password, isAdmin } = req.body;

  decoded = jwt.decode(token, process.env.SECRET_ACCESS_TOKEN);

  const emailExist = await User.findOne({ email: decoded.email });
  if (emailExist)
    return res
      .status(400)
      .json({ error: "An account with this email already exists." });
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
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  //checking for existing email
  const user = await User.findOne({ username });
  if (!user)
    return res.status(400).json({ error: "Incorrect email or password." });

  //pw validation
  const validPw = await bcrypt.compare(password, user.password);
  if (!validPw)
    return res.status(400).json({ error: "Incorrect email or password." });

  res.status(201).json({ error: "" });
});
module.exports = router;
