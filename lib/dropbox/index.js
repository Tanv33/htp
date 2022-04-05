const { Dropbox } = require("dropbox"); // eslint-disable-line import/no-unresolved
const { ACCESS_TOKEN } = require("../../config");
var dbx = new Dropbox({
  accessToken: ACCESS_TOKEN,
});

module.exports = { dbx };
