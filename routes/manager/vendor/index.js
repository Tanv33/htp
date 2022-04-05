const express = require("express");
const router = express.Router();
const createVendor = require("./register");

router.post("/create", createVendor);

module.exports = router;
