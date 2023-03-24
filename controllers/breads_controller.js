const express = require("express");
const breads = express.Router();
const allBreads = require("../models/bread");

// Get all breads
breads.get("/", (req, res) => {
  allBreads.find().then((foundBreads) => {
    res.render("Index", {
      breads: foundBreads,
      title: "Index Page",
    });
  });
});

// UPDATE
breads.put("/:arrayIndex", (req, res) => {
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  allBreads[req.params.arrayIndex] = req.body;
  res.redirect(`/breads/${req.params.arrayIndex}`);
});

// EDIT
breads.get("/:indexArray/edit", (req, res) => {
  res.render("Edit", {
    bread: allBreads[req.params.indexArray],
    index: req.params.indexArray,
  });
});

// NEW
breads.get("/new", (req, res) => {
  res.render("New");
});

// Delete a bread
breads.delete("/:id", (req, res) => {
  allBreads.findByIdAndDelete(req.params.id).then((deleteBread) => {
    res.status(303).redirect("/breads");
  });
});

// Show one bread
breads.get("/:id", (req, res) => {
  allBreads
    .findById(req.params.id)
    .then((foundBread) => {
      res.render("show", {
        bread: foundBread,
      });
    })
    .catch((err) => {
      res.send("404");
    });
});

// Create a new bread
breads.post("/", (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined;
  }
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  allBreads.create(req.body);
  res.redirect("/breads");
});

module.exports = breads;
