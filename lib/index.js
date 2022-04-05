const { send_email } = require("./node-mailer");
const { dbx } = require("./dropbox");
const upload = require("./multer");

module.exports = {
  send_email,
  dbx,
  upload,
};
