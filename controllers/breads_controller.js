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
  if (allBreads[req.params.arrayIndex]) {
    res.render("Show", {
      bread: allBreads[req.params.arrayIndex],
    });
  } else {
    res.render("PageNotFound");
  }
});

module.exports = breads;
