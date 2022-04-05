const express = require("express");
const router = express.Router();
const basicChart = require("./basic");
const dateChart = require("./date");
const getAllLocation = require("./get-all-location");
const patientByMonthsChart = require("./patient-by-month");

router.get("/basic", basicChart);
router.get("/patient-by-month", patientByMonthsChart);
router.get("/get-all-location", getAllLocation);
router.get("/date", dateChart);
module.exports = router;
