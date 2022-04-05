const express = require("express");
const router = express.Router();
const approveEmployee = require("./approve-employee");
const location = require("./location");
const searchEmployee = require("./search-employee");
const vendor = require("./vendor");
const patient = require("./patient");
const chart = require("./chart");

router.use("/location", location);
router.use("/employee", approveEmployee);
router.use("/search-employee", searchEmployee);
router.use("/vendor", vendor);
router.use("/patient", patient);
router.use("/chart", chart);

module.exports = router;
