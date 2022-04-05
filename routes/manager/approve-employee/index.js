const express = require("express");
const router = express.Router();
const getEmployees = require("./get-employees");
const approveAwaitEmployee = require("./approve-or-await-employee");

router.get("/get-employees", getEmployees);
router.put("/approve-employees/:id", approveAwaitEmployee);

module.exports = router;
