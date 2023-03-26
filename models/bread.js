// require mongoose
const mongoose = require("mongoose");
// creating shorthand for the Schema constructor
const { Schema } = mongoose;

// schema
const breadSchema = new Schema({
  name: { type: String, required: true },
  hasGluten: Boolean,
  image: { type: String, default: "http://placehold.it/500x500.png" },
  baker: {
    type: Schema.Types.ObjectId,
    ref: "Baker",
  },
});

// helper methods
breadSchema.methods.getBakedBy = function () {
  if (this.baker) {
    let startyear = "";
    if (this.baker.startDate) {
      startyear = this.baker.startDate.getFullYear();
    }

    return `${this.name} was baked with love by ${this.baker.name}, who has been with us since ${startyear}`;
  } else {
    return `${this.name} was baked with love by some unknown baker`;
  }
};

breadSchema.static.getAllBreads = function (bakerName) {
  console.log(bakerName);
};

// model and export
const Bread = mongoose.model("Bread", breadSchema);

module.exports = Bread;
