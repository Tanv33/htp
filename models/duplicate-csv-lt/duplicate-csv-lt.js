const mongoose = require("mongoose");
const schemaType = require("../../types");

const duplicateCsvLt = new mongoose.Schema(
  {
    csv_id: {
      type: schemaType.ObjectID,
      ref: "uploadHistory",
    },
    pid: {
      type: schemaType.TypeString,
    },
    order_no: {
      type: schemaType.TypeNumber,
    },
    patient_result: {
      type: schemaType.TypeString,
    },
    created_by: {
      type: schemaType.ObjectID,
      ref: "user",
    },
    uploaded_date: { type: schemaType.TypeDate, default: Date.now },
  },
  { timestamps: true }
);

module.exports = duplicateCsvLt;
