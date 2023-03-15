const express = require("express");
const breads = express.Router();
const allBreads = require("../models/bread");

// Get all breads
breads.get("/", (req, res) => {
  res.render("Index", {
    breads: allBreads,
    title: "Index Page",
  });
});

// NEW
breads.get("/new", (req, res) => {
  res.render("New");
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

// Create a new bread
breads.post("/", (req, res) => {
  if (!req.body.image) {
    req.body.image =
      "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";
  }
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  allBreads.push(req.body);
  res.redirect("/breads");
});

module.exports = breads;
