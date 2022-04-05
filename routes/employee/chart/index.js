const express = require("express");
const router = express.Router();
const basicGraph = require("./basic");
const dateChart = require("./date");
const patientByMonth = require("./patient-by-month");

router.get("/basic", basicGraph);
router.get("/patient-by-month", patientByMonth);
router.get("/date", dateChart);
module.exports = router;
