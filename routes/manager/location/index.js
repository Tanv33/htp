const express = require("express");
const { upload } = require("../../../lib");
const addNewTestType = require("./add-new-test-type");
const router = express.Router();
const createLocation = require("./create-location");
const deleteLocation = require("./delete-location");
const deleteNewTestType = require("./delete-new-test-type");
const getAllLocation = require("./get-all-location");
const updatedLocation = require("./update-location");
const updateNewTestType = require("./update-new-test-type");

router.post("/create", upload.single("location_logo"), createLocation);
router.get("/get-all-location", getAllLocation);
router.put("/update/:id", updatedLocation);
router.delete("/delete-location", deleteLocation);

router.post("/add-new-test/:id", addNewTestType);
router.delete("/delete-test", deleteNewTestType);
router.put("/update-test", updateNewTestType);

module.exports = router;
