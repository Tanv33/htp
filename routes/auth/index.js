const express = require("express");
const router = express.Router();
const signUp = require("./signup");
const loginUser = require("./login");
const forgetPassword = require("./forgot-password");
const confrimOtp = require("./confirm-otp");
const checkPassword = require("./check-password");
const getManagerMid = require("./get-manager-mid-location");
const getEmployees = require("./get-employees");
const verifyCode = require("./verification-code");
const { upload } = require("../../lib");
// const checkPassword = require("./check-password");
// const { tokenVerification } = require("../../middleware");

// ROUTES * /api/auth/
router.post(
  "/register",
  upload.fields([
    { name: "manager_logo", maxCount: 1 },
    { name: "production_manager_logo", maxCount: 1 },
  ]),
  signUp
);
router.post("/login", loginUser);
router.post("/forgetpassword", forgetPassword);
router.post("/confirm-otp", confrimOtp);
router.post("/checkpassword", checkPassword);
router.get("/get-manager-mid", getManagerMid);
router.get("/get-employees", getEmployees);
router.post("/get-verify", verifyCode);
// router.post("/", checkPassword);

module.exports = router;
