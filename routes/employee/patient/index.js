const express = require("express");
const { upload } = require("../../../lib");
const router = express.Router();
const addPatient = require("./add-patient");
const deletePatient = require("./delete-patient");
const getUnCollectedPatient = require("./get-uncollected-patient");
const getRequiredFields = require("./get-required-fields");
const reTestPatient = require("./re-test-patient");
const updatePatient = require("./update-patient");
const getCollectedPatient = require("./get-collected-patient");
const getRapidPatient = require("./get-rapid-patient");
const getAllTestedPatient = require("./get-tested-patient");
const fireRapidPatient = require("./fire-rapid-patient");
const sendPdfToPatient = require("./send-pdf-to-patient");
const searchPatient = require("./search-collected-patient");
const searchCollected = require("./search-collected-patient");
const searchUnCollected = require("./search-uncollected-patient");
const searchRapidPatient = require("./search-rapid-patient");
const searchTested = require("./search-tested-patient");

// ROUTES * /api/user//
router.get("/get-required-fields", getRequiredFields);
router.get("/get-uncollected-patient", getUnCollectedPatient);
router.get("/get-collected-patient", getCollectedPatient);
router.get("/get-rapid-patient", getRapidPatient);
router.get("/get-tested-patient", getAllTestedPatient);
router.post("/fire-rapid-patient", fireRapidPatient);
router.post(
  "/add-patient",
  upload.fields([
    { name: "signature", maxCount: 1 },
    { name: "id_image", maxCount: 1 },
    { name: "identity_card", maxCount: 1 },
    { name: "insurance_image", maxCount: 1 },
  ]),
  addPatient
);
router.delete("/delete-patient", deletePatient);
router.post("/re-test-patient", reTestPatient);
router.put(
  "/update-patient/:id",
  upload.single("insurance_image"),
  updatePatient
);
router.post("/send-email", sendPdfToPatient);
router.get("/search-collected", searchCollected);
router.get("/search-uncollected", searchUnCollected);
router.get("/search-rapid", searchRapidPatient);
router.get("/search-tested", searchTested);

module.exports = router;
