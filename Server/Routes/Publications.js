const express = require("express");
const Publication = require("../Models/Publication");
const router = express.Router();
const cors = require("cors");

router.post("/add", async (req, res) => {
  console.log("Here");
  const { Title, Collaborators, Journal, Bib, Year, Type, Topic } = req.body;
  const titleExist = await Publication.findOne({ Title });
  if (titleExist) {
    return res
      .status(400)
      .json({ error: "An article with this title exists." });
  }
  try {
    const publication = new Publication({
      Title,
      Collaborators,
      Journal,
      Bib,
      Year,
      Type,
      Topic,
    });
    newArticle = await publication.save();
    res.status(201).json({ error: "" });
    console.log("Article added successfully");
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

router.get("/get", async (req, res) => {
  try {
    const articles = await Publication.find({});
    return res.status(200).json({ error: "", articles });
  } catch (error) {
    return res.status(400).json({ error });
  }
});
module.exports = router;
