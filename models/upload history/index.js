const mongoose = require("mongoose");
const uploadSchema = require("./upload-history");

const uploadHistory = mongoose.model("upload history", uploadSchema);

module.exports = uploadHistory;
