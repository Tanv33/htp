const express = require("express");
const router = express.Router();
const addTestType = require("./add-test-type");
const addUserTestType = require("./add-user-test-type");
const deleteTestType = require("./delete-test-type");
const deleteUserTestType = require("./delete-user-test-type");
const getTestType = require("./get-test-type");
const getUserTestType = require("./get-user-test-type");
const updateTestType = require("./update-test-type");
const updateUserTestType = require("./update-user-test-type");

// ROUTES
// test Type => Admin
router.get("/get-test-types", getTestType);
router.post("/add-test-type", addTestType);
router.delete("/delete-test-type", deleteTestType);
router.put("/update-test-type/:id", updateTestType);

// test Type => User
router.get("/get-user-test-type", getUserTestType);
router.post("/add-user-test-type", addUserTestType);
router.put("/update-user-test-type", updateUserTestType);
router.delete("/delete-user-test-type", deleteUserTestType);

module.exports = router;
