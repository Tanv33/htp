const express = require("express");
const router = express.Router();
const circularChart = require("./circular");
const dateChart = require("./date");
const patientByMonthsChart = require("./patient-by-month");

router.get("/circular", circularChart);
router.get("/patient-by-month", patientByMonthsChart);
router.get("/date", dateChart);
module.exports = router;
