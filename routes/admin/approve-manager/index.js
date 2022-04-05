const express = require("express");
const router = express.Router();
const getManagers = require("./get-managers");
const approveAwaitManager = require("./approve-or-await-manager");

router.get("/get-managers", getManagers);
router.put("/approve-manager/:id", approveAwaitManager);

module.exports = router;
