const express = require("express");
const { upload } = require("../../../lib");
const router = express.Router();
const addPatient = require("./add-patient");
const deletePatient = require("./delete-patient");
const getPatientForm = require("./get-form");
const getPatient = require("./get-patient");
const getRequiredFields = require("./get-required-fields");
const reTestPatient = require("./re-test-patient");
const searchPatient = require("./search-patient");
const updatePatient = require("./update-patient");

// ROUTES * /api/user//
router.post("/get-required-fields", getRequiredFields);
router.get("/get-patient", getPatient);
router.post(
  "/add-patient/:location_id",
  upload.fields([
    { name: "signature", maxCount: 1 },
    { name: "id_image", maxCount: 1 },
    { name: "identity_card", maxCount: 1 },
    { name: "insurance_image", maxCount: 1 },
  ]),
  addPatient
);
router.delete("/delete-patient", deletePatient);
router.post("/re-test-patient", reTestPatient);
router.put(
  "/update-patient/:id",
  upload.single("insurance_image"),
  updatePatient
);
router.get("/get-form", getPatientForm);
router.get("/search", searchPatient);

module.exports = router;
