const mongoose = require("mongoose");
const locationSchema = require("./location-schema");

const location = mongoose.model("location", locationSchema);

module.exports = location;
