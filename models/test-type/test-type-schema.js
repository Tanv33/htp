const mongoose = require("mongoose");
const schemaType = require("../../types");

const testTypeSchema = new mongoose.Schema(
  {
    name: {
      type: schemaType.TypeString,
      unique: true,
    },
    types: {
      type: schemaType.TypeArray,
      default: [],
    },
    status: {
      type: schemaType.TypeString,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = testTypeSchema;
