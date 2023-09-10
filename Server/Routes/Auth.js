const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
    const { firstName, lastName, uuid, password, email, isAdmin } = req.body;

  const emailExist = await User.findOne({ email });
  if (emailExist)
    return res
      .status(400)
      .json({ error: "An account with this email already exists." });
  //hashing pw
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    firstName,
    lastName,
    uuid,
    password: hashedPassword,
    email,
    isAdmin
  });

  try {
    newUser = await user.save();
    res.status(201).json({ error: "" });
  } catch (error) {
    res.status(400).json({ error });
  }
}
)
module.exports = router;
