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

// router.post("/files", async (req, res) => {
//   let paths = [];
//   console.log("here");
//   try {
//     if (!req.files) {
//       res.status(400).json({ body: "Files not found" });
//       return;
//     }

//     const files = req.files;

//     Object.keys(files).forEach((key) => {
//       const path = `/Users/aaryadevnani/Documents/Projects/MOLA-Lab Challenge/frontend/Server/Routes/files/${files[key].name}`;
//       files[key].mv(path, (err) => {
//         if (err) {
//           return res.status(500).json({ status: "error", message: err });
//         } else {
//           reader = fs.readFile(path, (err, data) => {
//             console.log(err);
//             console.log(data.toString());
//           });
//         }
//       });
//     });

//     res.status(200).json({ body: "Files Uploaded" });
//   } catch (e) {
//     console.log(e);
//   }
// });
router.post("/files", async (req, res) => {
  const { bibs } = req.body;
  // console.log(req.body);
  // let sample = bibtexParse.toJSON(bibs[0]);
  // console.log(bibs);
  let results = [];
  bibs.map(async (bib) => {
    bibJSON = bibtexParse.toJSON(bib)[0];
    // console.log(bibJSON.entryTags);
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
      Type: "",
      Topic: "",
      Key: bibJSON.citationKey,
    });
    const titleExist = await Publication.findOne({ Key: bibJSON.citationKey });
    if (!titleExist) {
      newArticle = await publication.save();
    }
    results.push({
      Key: bibJSON.entryTags.year,
      Status: newArticle,
    });
  });
  res.status(200).json(results);
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
