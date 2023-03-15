const express = require("express");
const breads = express.Router();
const allBreads = require("../models/bread");

// Get all breads
breads.get("/", (req, res) => {
  res.render("Index", {
    breads: allBreads,
    title: "Index Page",
  });
  // res.send(Bread)
});

// Get one bread
breads.get("/:arrayIndex", (req, res) => {
  res.send(allBreads[req.params.arrayIndex]);
});

module.exports = breads;
