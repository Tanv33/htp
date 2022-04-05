const mongoose = require("mongoose");
const schemaType = require("../../types");

const locationSchema = new mongoose.Schema(
  {
    location_name: {
      type: schemaType.TypeString,
      // required: true,
    },
    location_logo: {
      type: schemaType.TypeString,
      // required: true,
    },
    email: {
      type: schemaType.TypeString,
      // required: true,
    },
    city: {
      type: schemaType.TypeString,
      // required: true,
    },
    consent: {
      type: schemaType.TypeString,
      // required: true,
    },
    state: {
      type: schemaType.TypeString,
      // required: true,
    },
    address: {
      type: schemaType.TypeString,
      // required: true,
    },
    zip_code: {
      type: schemaType.TypeString,
      // required: true,
    },
    test: {
      type: schemaType.TypeArray,
      // required: true,
    },
    patient_required_fields: {
      type: schemaType.TypeArray,
      // required: true,
    },
    business_or_individual: {
      type: schemaType.TypeString,
    },
    send_copy_to_email: {
      type: schemaType.TypeBoolean,
    },
    production: {
      type: schemaType.TypeString,
    },
    production_email: {
      type: schemaType.TypeString,
    },
    location_id: {
      type: schemaType.TypeString,
    },
    location_first_name: {
      type: schemaType.TypeString,
    },
    location_last_name: {
      type: schemaType.TypeString,
    },
    created_by: {
      type: schemaType.ObjectID,
      ref: "user",
    },
    user_type: {
      type: schemaType.ObjectID,
      ref: "user-types",
    },
  },
  { timestamps: true }
);

module.exports = locationSchema;
