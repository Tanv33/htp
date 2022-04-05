const express = require("express");
const getAllManagerlocations = require("./get-all-manager-location");
const getManagerLocationBySearch = require("./get-manager-location-by-search");
const getManagersName = require("./get-managers-name");
const router = express.Router();

router.get("/get-managers-locations", getAllManagerlocations);
router.get("/name", getManagersName);
router.get("/get-location", getManagerLocationBySearch);

module.exports = router;
