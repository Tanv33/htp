const express = require("express");
const basicChart = require("./basic");
const dateChart = require("./date-chart");
const patientByMonthsChart = require("./patient-by-months-chart");
const router = express.Router();

router.get("/patient-by-months", patientByMonthsChart);
router.get("/basic", basicChart);
router.get("/date", dateChart);

module.exports = router;
