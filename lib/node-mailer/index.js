const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = require("../../config");

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, html);
    }
  });
};

const send_email = (
  res,
  template,
  replacements,
  from,
  subject,
  email,
  attachObject
) => {
  readHTMLFile(`./public/templates/${template}.html`, function (err, html) {
    var template = handlebars.compile(html);
    //   var replacements = {
    //     username: "ghous ahmed",
    //     locationDescription: "test",
    //   };
    var htmlToSend = template(replacements);

    const mailOptions = {
      // from: `${from} <info@stopthevirus.health>`,
      from: `${from} <tanveer.khan@asinlabs.tech>`,
      to: email,
      subject: subject, //"Awaiting Admin Approval",
      html: htmlToSend,
      attachments: attachObject,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error===>", error);
        // return res.status(400).send({ status: 400, message: error });
      }
      console.log("Email sent: ", info);
      // attachObject?.map((item) => {
      //   fs.unlinkSync(item.path);
      // });

      // return res.status(200).send({ status: 200, message: info.response });
    });
  });
};

module.exports = {
  send_email,
};
