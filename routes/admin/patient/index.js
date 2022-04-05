const express = require("express");
const router = express.Router();
const deletePatient = require("./delete-location-patient");
const getAllLocationPatients = require("./get-all-location-patients");
const updatePatient = require("./update-location-patient");
const searchAllPatient = require("./search-patient");

router.get("/get-all-location-patients", getAllLocationPatients);
router.put("/update-location-patient/:id", updatePatient);
router.delete("/delete-location-patient", deletePatient);
router.get("/search", searchAllPatient);

module.exports = router;
