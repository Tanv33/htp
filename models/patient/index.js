const mongoose = require("mongoose");
const patientSchema = require("./patient-schema");

const patient = mongoose.model("patient", patientSchema);

module.exports = patient;
