const express = require("express");
const { upload } = require("../../../lib");
const firePatient = require("./fire-patient");
const firePatientWithCsv = require("./fire-patient-with-csv");
const getAllDuplicatePatient = require("./get-duplicate-patient");
const getFirePatientByUploadId = require("./get-fire-patient-by-upload-id copy");
const getTestedtPatient = require("./get-tested-patient");
const getUploadHistory = require("./get-upload-history");
const searchPatient = require("./search-patient");

const router = express.Router();

router.get("/tested", getTestedtPatient);
router.post("/fire", firePatient);
router.post("/csv-fire", upload.single("csv"), firePatientWithCsv);
router.get("/search", searchPatient);
router.get("/get-history", getUploadHistory);
router.get("/duplicate/:id", getFirePatientByUploadId);
router.get("/get-duplicates", getAllDuplicatePatient);

module.exports = router;
