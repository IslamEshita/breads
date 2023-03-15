// Bringing in required modules
const express = require("express");
const dotenv = require("dotenv");

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

// Add routes

// Home Route - /
app.get("/", (req, res) => {
  res.send("Hello Bread CRUD app!");
});

// Breads Route - /breads
const breadsController = require("./controllers/breads_controller");
app.use("/breads", breadsController);

// 404 Page
app.get("*", (req, res) => {
  res.render("PageNotFound");
});

// Listen on port
app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
