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

// Show one bread
breads.get("/:arrayIndex", (req, res) => {
  res.render("Show", {
    bread: allBreads[req.params.arrayIndex],
  });
});

module.exports = breads;
