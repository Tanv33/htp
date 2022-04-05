const mongoose = require("mongoose");
const schemaType = require("../../types");

const patientSchema = new mongoose.Schema(
  {
    first_name: {
      type: schemaType.TypeString,
      // required: true,
    },
    last_name: {
      type: schemaType.TypeString,
      // required: true,
    },
    date_of_birth: {
      type: schemaType.TypeDate,
      // required: true,
    },
    gender: {
      type: schemaType.TypeString,
      // required: true,
    },
    pregnant: {
      type: schemaType.TypeString,
      // required: true,
    },
    sex_assign_at_birth: {
      type: schemaType.TypeString,
      // required: true,
    },
    race: {
      type: schemaType.TypeString,
      // required: true,
    },
    language: {
      type: schemaType.TypeString,
      // required: true,
    },
    ethnicity: {
      type: schemaType.TypeString,
      // required: true,
    },
    marital_status: {
      type: schemaType.TypeString,
      // required: true,
    },
    email: {
      type: schemaType.TypeString,
      // unique: true,
      // required: true,
    },
    telephone: {
      type: schemaType.TypeString,
      // unique: true,
      // required: true,
    },
    address: {
      type: schemaType.TypeString,
      // required: true,
    },
    state: {
      type: schemaType.TypeString,
      // required: true,
    },
    city: {
      type: schemaType.TypeString,
      // required: true,
    },
    postal_code: {
      type: schemaType.TypeString,
      // required: true,
    },
    payment: {
      type: schemaType.TypeString,
      // required: true,
    },
    employment: {
      type: schemaType.TypeString,
      // required: true,
    },
    insurance_name: {
      type: schemaType.TypeString,
      // required: true,
    },
    insurance_policy_number: {
      type: schemaType.TypeString,
      // required: true,
    },
    insurance_image: {
      type: schemaType.TypeString,
      // required: true,
    },
    us_id: {
      type: schemaType.TypeString,
      // required: true,
    },
    us_id_no: {
      type: schemaType.TypeString,
      // required: true,
    },
    ssn: {
      type: schemaType.TypeString,
      // required: true,
    },
    // delivery_method: {
    //   type: schemaType.TypeArray,
    //   // required: true,
    // },
    patient_signature: {
      type: schemaType.TypeString,
      // required: true,
    },

    // static
    location_id: {
      type: schemaType.ObjectID,
      ref: "location",
    },
    is_tested: {
      type: schemaType.TypeString,
      default: "No",
    },
    created_by: {
      type: schemaType.ObjectID,
      ref: "user",
    },
    signature: {
      type: schemaType.TypeString,
      // PDF File
      // required: true,
    },
    consent_link: {
      type: schemaType.TypeString,
      // PDF File
      // required: true,
    },
    test_type: {
      type: Object,
      // ref: "test-types",
      // required: true,
    },
    pid: {
      type: schemaType.TypeString,
      // unique: true,
      // required: true,
    },
    pid_link: {
      type: schemaType.TypeString,
      // required: true,
    },

    created_date: {
      type: schemaType.TypeDate,
      default: Date.now,
    },
    covid_test_form: {
      type: schemaType.TypeString,
      // PDF File
      // required: true,
    },

    patient_test_result_sign_off: {
      type: schemaType.TypeString,
      // PDF File
      // required: true,
    },
    tested_by: {
      type: schemaType.ObjectID,
      ref: "user",
      // required: true,
    },
    tested_date: {
      type: schemaType.TypeDate,
      // required: true,
    },
    bar_code: {
      type: schemaType.TypeString,
      // required: true,
    },
    order_no: {
      type: schemaType.TypeNumber,
      // required: true,
    },
    is_review: {
      type: schemaType.TypeBoolean,
      default: false,
      // required: true,
    },
    production: {
      type: schemaType.TypeBoolean,
      default: false,
      // required: true,
    },
    patient_result: {
      type: schemaType.TypeString,
    },
    patient_result_date: {
      type: schemaType.TypeDate,
    },
  },
  { timestamps: true }
);

module.exports = patientSchema;
