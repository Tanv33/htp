const express = require("express");
const router = express.Router();
const patient = require("./patient");
const csv = require("./csv");
const location = require("./location");
const chart = require("./chart");

router.use("/patient", patient);
router.use("/csv", csv);
router.use("/location", location);
router.use("/chart", chart);

module.exports = router;
