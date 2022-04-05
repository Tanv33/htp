const mongoose = require("mongoose");
const schemaType = require("../../types");

const NumberGeneratorSchema = new mongoose.Schema(
  {
    name: {
      type: schemaType.TypeString,
      required: true,
    },
    value: {
      type: schemaType.TypeNumber,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = NumberGeneratorSchema;
