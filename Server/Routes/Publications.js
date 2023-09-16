const express = require("express");
const Publication = require("../Models/Publication");
const router = express.Router();
const bibtexParse = require("@orcid/bibtex-parse-js");

router.post("/add", async (req, res) => {
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

router.post("/files", async (req, res) => {
  let results = [];
  const { bibs } = req.body;
  let newArticle;
  try {
    let temp = await Promise.all(
      bibs.map(async (bib) => {
        return new Promise(async (resolve, reject) => {
          bibsParsed = bibtexParse.toJSON(bib);
          bibsParsed.forEach(async (bibJSON) => {
            let journal = "";
            if (!bibJSON.entryTags.publisher && !bibJSON.entryTags.journal) {
              journal = " ";
            } else if (!bibJSON.entryTags.journal) {
              journal = bibJSON.entryTags.publisher;
            } else {
              journal = bibJSON.entryTags.journal;
            }
            let publication = new Publication({
              Title: bibJSON.entryTags.title,
              Collaborators: bibJSON.entryTags.author,
              Journal: journal,
              Bib: "",
              Year: bibJSON.entryTags.year,
              Type: bibJSON.entryTags.type ? bibJSON.entryTags.type : "",
              Topic: bibJSON.entryTags.topic ? bibJSON.entryTags.topic : "",
              Key: bibJSON.citationKey,
            });
            const titleExist = await Publication.findOne({
              Key: bibJSON.citationKey,
            });
            if (!titleExist) {
              newArticle = await publication.save();
              resolve(newArticle);
            } else {
              reject("Title already exists");
            }
          });
        });
      })
    );
    let results = [];
    temp.forEach((pub) => {
      results.push(pub.Key);
    });
    res.status(201).json({ keys: results, error: "" });
  } catch (error) {
    res.status(500).json({ keys: [], error: error });
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
