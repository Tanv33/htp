const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.user = require("./user");
db.userType = require("./user-type");
db.otp = require("./otp");
db.patient = require("./patient");
db.testType = require("./test-type");
db.NumberGeneratorModel = require("./number-generator-model");
db.location = require("./location");
db.verification = require("./verification-key");

module.exports = db;
