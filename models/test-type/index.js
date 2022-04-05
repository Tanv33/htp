const mongoose = require("mongoose");
const testTypeSchema = require("./test-type-schema");

const testType = mongoose.model("test-types", testTypeSchema);

module.exports = testType;
