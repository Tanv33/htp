const mongoose = require("mongoose");
const schemaType = require("../../types");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: schemaType.TypeString,
    },
    last_name: {
      type: schemaType.TypeString,
    },
    full_name: {
      type: schemaType.TypeString,
    },
    address: {
      type: schemaType.TypeString,
    },
    city: {
      type: schemaType.TypeString,
    },
    state: {
      type: schemaType.TypeString,
    },
    zip_code: {
      type: schemaType.TypeString,
    },
    lab_name: {
      type: schemaType.TypeString,
    },
    lab_address: {
      type: schemaType.TypeString,
    },
    telephone: {
      type: schemaType.TypeString,
      // unique: true,
    },
    email: {
      type: schemaType.TypeString,
      unique: true,
    },
    password: {
      type: schemaType.TypeString,
    },
    date_of_birth: {
      type: schemaType.TypeDate,
    },
    status: {
      type: schemaType.TypeString,
      default: "Pending",
    },
    type: {
      type: schemaType.ObjectID,
      ref: "user-types",
    },
    mid: {
      type: schemaType.TypeString,
    },
    pmid: {
      type: schemaType.TypeString,
    },
    manager_logo: {
      type: schemaType.TypeString,
    },
    manager_signature: {
      type: schemaType.TypeString,
    },
    production_manager_logo: {
      type: schemaType.TypeString,
    },
    production_manager_signature: {
      type: schemaType.TypeString,
    },
    created_date: {
      type: schemaType.TypeDate,
      default: Date.now,
    },
    manager_location: {
      type: [schemaType.TypeObjectId],
      ref: "location",
      // requried: true,
    },
    production_manager_location: {
      type: [schemaType.TypeObjectId],
      ref: "location",
      // requried: true,
    },
    employee_location: {
      type: schemaType.TypeObjectId,
      ref: "location",
      // requried: true,
    },
    vendor_name: {
      type: schemaType.TypeString,
    },
    vendor_locations: {
      type: [schemaType.TypeObjectId],
      ref: "location",
      // requried: true,
    },
    user_test_type: {
      type: schemaType.TypeArray,
    },
  },
  { timestamps: true }
);

module.exports = userSchema;
