const express = require("express");
const basicChart = require("./basic");
const dateChart = require("./date");
const patientByMonthsChart = require("./patient-by-month");
const router = express.Router();

router.get("/basic", basicChart);
router.get("/date", dateChart);
router.get("/patient-by-month", patientByMonthsChart);

module.exports = router;
