const express = require("express");
const router = express.Router();
const {
  tokenVerification,
  employeeVerification,
  adminVerification,
  managerVerification,
  prodcutionManagerVerification,
} = require("../middleware");
const auth = require("./auth");
const user_Type = require("./user-type");
const test_Type = require("./test-type");
const admin = require("./admin");
const employee = require("./employee");
const manager = require("./manager");
const public = require("./public");
const productionManager = require("./production manager");
const vendor = require("./vendor");
const { upload } = require("../lib");

// AUTH Routes * /api/auth/*
router.use("/auth", auth);
router.use("/user", tokenVerification, user_Type);
router.use("/test", tokenVerification, test_Type);
router.use("/employee", tokenVerification, employeeVerification, employee);
router.use("/admin", tokenVerification, adminVerification, admin);
router.use("/manager", tokenVerification, managerVerification, manager);
router.use("/vendor", tokenVerification, vendor);
router.use("/public", public);
router.use(
  "/production-manager",
  tokenVerification,
  prodcutionManagerVerification,
  productionManager
);
router.post("/rough", upload.single("logo"), (req, res) => {
  console.log("req.body", req.body);
  return res.status(200).send(req.body);
});

module.exports = router;
