const express = require("express");
const breads = express.Router();
const allBreads = require("../models/bread");
const Baker = require("../models/baker");

// Get all breads
breads.get("/", async (req, res) => {
  const foundBakers = await Baker.find().lean();
  const foundBreads = await allBreads.find().limit(2).lean();
  res.render("Index", {
    breads: foundBreads,
    bakers: foundBakers,
    title: "Index Page",
  });
});

// UPDATE
breads.put("/:id", (req, res) => {
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  allBreads
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedBread) => console.log(updatedBread));

  res.redirect(`/breads/${req.params.id}`);
});

// EDIT
breads.get("/:id/edit", (req, res) => {
  Baker.find().then((foundBakers) => {
    allBreads.findById(req.params.id).then((foundBread) => {
      res.render("edit", {
        bread: foundBread,
        bakers: foundBakers,
      });
    });
  });
});

// New
breads.get("/new", (req, res) => {
  Baker.find().then((foundBakers) => {
    res.render("new", {
      bakers: foundBakers,
    });
  });
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
    .populate("baker")
    .then((foundBread) => {
      const bakedBy = foundBread.getBakedBy();
      console.log(bakedBy);
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

breads.get("/data/seed", (req, res) => {
  allBreads
    .insertMany([
      {
        name: "Rye",
        hasGluten: true,
        image:
          "https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      },
      {
        name: "French",
        hasGluten: true,
        image:
          "https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      },
      {
        name: "Gluten-Free",
        hasGluten: false,
        image:
          "https://images.unsplash.com/photo-1546538490-0fe0a8eba4e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
      },
      {
        name: "Pumpernickel",
        hasGluten: true,
        image:
          "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
      },
    ])
    .then((createdBreads) => {
      res.redirect("/breads");
    });
});

module.exports = breads;
