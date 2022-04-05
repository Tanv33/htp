const express = require("express");
const router = express.Router();
const query = require("./query");

router.get("/query", query);

module.exports = router;
