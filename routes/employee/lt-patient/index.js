const express = require("express");
const { upload } = require("../../../lib");
const firePatient = require("./fire-patient");
const firePatientWithCsv = require("./fire-patient-with-csv");
const getTestedtPatient = require("./get-tested-patient");
const searchPatient = require("./search-patient");

const router = express.Router();

router.get("/tested", getTestedtPatient);
router.post("/fire", firePatient);
router.post("/csv-fire", upload.single("csv"), firePatientWithCsv);
router.get("/search", searchPatient);

module.exports = router;
