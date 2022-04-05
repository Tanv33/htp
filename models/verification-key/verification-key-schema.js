const mongoose = require("mongoose");
const schemaType = require("../../types");

const verificaitonSchema = new mongoose.Schema(
  {
    email: {
      type: schemaType.TypeString,
      required: true,
    },
    verification_key: {
      type: schemaType.TypeString,
      required: true,
    },
    used: { type: schemaType.TypeBoolean, default: false },
    created: { type: schemaType.TypeDate, default: Date.now },
  },
  { timestamps: true }
);

module.exports = verificaitonSchema;
