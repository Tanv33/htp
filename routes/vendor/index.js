const express = require("express");
const getPatient = require("./get-patients");
const searchPatient = require("./search-patient");
const chart = require("./chart");
const updateProfile = require("./update-profile");
const router = express.Router();

router.use("/chart", chart);
router.get("/get-patients", getPatient);
router.get("/search-patient", searchPatient);
router.post("/update-profile/:id", updateProfile);
module.exports = router;
