const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Collaborators: {
    type: String,
    required: true,
  },
  Journal: {
    type: String,
    required: true,
  },
  Bib: {
    type: String,
    required: false,
  },
  Year: {
    type: Number,
    required: true,
  },
  Type: {
    type: String,
    required: false,
  },
  Topic: {
    type: String,
    required: false,
  },
  Key: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Publication", publicationSchema);
