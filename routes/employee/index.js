const express = require("express");
const router = express.Router();
const patient = require("./patient");
const chart = require("./chart");
const ltPatient = require("./lt-patient");
const ltChart = require("./lt-chart");

router.use("/patient", patient);
router.use("/chart", chart);
router.use("/lt-patient", ltPatient);
router.use("/lt-chart", ltChart);

module.exports = router;
