const express = require("express");
const { upload } = require("../../../lib");
const router = express.Router();
const createLocation = require("./create-location");
const deleteLocation = require("./delete-location");
const getAllLocation = require("./get-all-location");
const updatedLocation = require("./update-location");

router.post("/create", upload.single("location_logo"), createLocation);
router.get("/get-all-location", getAllLocation);
router.put("/update/:id", updatedLocation);
router.delete("/delete-location", deleteLocation);

module.exports = router;
