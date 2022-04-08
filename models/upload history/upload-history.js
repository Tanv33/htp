const mongoose = require("mongoose");
const schemaType = require("../../types");

const uploadSchema = new mongoose.Schema(
  {
    total_result: {
      type: schemaType.TypeNumber,
    },
    uploaded_result: {
      type: schemaType.TypeNumber,
    },
    duplicate_result: {
      type: schemaType.TypeNumber,
    },
    created_by: {
      type: schemaType.ObjectID,
      ref: "user",
    },
    uploaded_date: { type: schemaType.TypeDate, default: Date.now },
  },
  { timestamps: true }
);

module.exports = uploadSchema;
