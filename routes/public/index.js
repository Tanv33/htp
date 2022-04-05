const express = require("express");
const router = express.Router();
const getLocation = require("./get-location");
const patientLogin = require("./patient-login");

router.get("/get-location", getLocation);
router.get("/patient-login", patientLogin);

module.exports = router;
