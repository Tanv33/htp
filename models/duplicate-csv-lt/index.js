const mongoose = require("mongoose");
const duplicateCsvLt = require("./duplicate-csv-lt");

const duplicateCsvLts = mongoose.model("duplicate csv lt", duplicateCsvLt);

module.exports = duplicateCsvLts;
