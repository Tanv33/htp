const mongoose = require("mongoose");
const verificaitonSchema = require("./verification-key-schema");

const verificaiton = mongoose.model("verification", verificaitonSchema);

module.exports = verificaiton;
