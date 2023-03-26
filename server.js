// Bringing in required modules
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// DEPENDENCIES
const methodOverride = require("method-override");

// Configure environment variable
dotenv.config();
const PORT = process.env.PORT;

// Create the express app
const app = express();

// MIDDLEWARE
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
app.use(express.static("public"));
// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
// MIDDLEWARE
app.use(methodOverride("_method"));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("connected to mongo: ", process.env.MONGO_URI);
  })
  .catch((err) => {
    console.log(mongoose.version);
    console.log(err);
  });

// Add routes

// Home Route - /
app.get("/", (req, res) => {
  res.send("Hello Bread CRUD app!");
});

// Breads Route - /breads
const breadsController = require("./controllers/breads_controller");
app.use("/breads", breadsController);

// Bakers
const bakersController = require("./controllers/bakers_controller");
app.use("/bakers", bakersController);

// 404 Page
app.get("*", (req, res) => {
  res.render("PageNotFound");
});

// Listen on port
app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
