const mongoose = require("mongoose");
const NumberGeneratorSchema = require("./number-generator-schema");

const NumberGeneratorModel = mongoose.model(
  "number-generator",
  NumberGeneratorSchema
);

module.exports = NumberGeneratorModel;
