const { tokenVerification } = require("./token-verification");
const { employeeVerification } = require("./employee-verification");
const { adminVerification } = require("./admin-verification");
const { managerVerification } = require("./manager-verification");
const {
  prodcutionManagerVerification,
} = require("./productionn manager verification");

module.exports = {
  tokenVerification,
  employeeVerification,
  adminVerification,
  managerVerification,
  prodcutionManagerVerification,
};
