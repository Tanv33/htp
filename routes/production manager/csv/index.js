const express = require("express");
const { upload } = require("../../../lib");
const router = express.Router();
const uploadCsv = require("./upload-csv");

router.post("/upload-csv", upload.single("csv"), uploadCsv);

module.exports = router;
