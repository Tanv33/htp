const mongoose = require("mongoose");
const schemaType = require("../../types");

const vendorSchema = new mongoose.Schema(
  {
    type: {
      type: schemaType.TypeString,
      required: true,
    },
    status: {
      type: schemaType.TypeString,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = vendorSchema;
