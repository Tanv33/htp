const express = require("express");
const deleteLocationPatient = require("./delete-location-patient");
const router = express.Router();
const getPatientForm = require("./get-form");
const getLocationPatient = require("./get-location-patient");
const searchPatient = require("./search-patient");
const updateLocationPatient = require("./update-location-patient");

router.get("/get-form", getPatientForm);
router.get("/get-location-patient", getLocationPatient);
router.get("/search-patient", searchPatient);
router.put("/update-location-patient/:id", updateLocationPatient);
router.delete("/delete-location-patient", deleteLocationPatient);

module.exports = router;
