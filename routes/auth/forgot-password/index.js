const Joi = require("joi");
const {
  insertNewDocument,
  findOne,
  generateRandomNumber,
} = require("../../../helpers");
const bcrypt = require("bcryptjs");
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = require("../../../config");
const { send_email } = require("../../../lib");

const schema = Joi.object({
  preferred_method: Joi.string().required().valid("Email", "Telephone"),
  email: Joi.string()
    .email()
    .when("preferred_method", { is: "Email", then: Joi.required() }),
  telephone: Joi.string().min(14).when("preferred_method", {
    is: "Telephone",
    then: Joi.required(),
  }),
});

const forgetPassword = async (req, res) => {
  let name = "";
  let telephoneNumber = "";
  const { email, telephone } = req.body;
  try {
    await schema.validateAsync(req.body);
    if (email) {
      const check_email = await findOne("user", { email });
      if (!check_email) {
        return res
          .status(400)
          .send({ status: 400, message: "Email not exist" });
      }
      // Employee Condition
      if (check_email.first_name && check_email.last_name) {
        name = check_email.first_name + " " + check_email.last_name;
        const managerObj = await findOne("userType", { type: "Manager" });
        telephoneNumber = await findOne("user", {
          type: managerObj._id,
          mid: check_email.mid,
        });
      }
      // Manager Condition
      if (check_email.full_name) {
        name = check_email.full_name;
        telephoneNumber = check_email.telephone;
      }
      // Function for creating OTP key
      const otp_key = generateRandomNumber(111111, 999999).toFixed(0);
      await insertNewDocument("otp", {
        otp_key: bcrypt.hashSync(otp_key, bcrypt.genSaltSync(10)),
        email,
      });
      send_email(
        res,
        "forgotPassword",
        { username: name, OTP: otp_key, telephone: telephoneNumber },
        "Health Titan Pro",
        "OTP Key",
        email
      );
      res.status(200).send({ status: 200, message: "Otp send successfully" });
    }
    // Telephone
    if (telephone) {
      // Twilio verification
      const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
      const check_telephone = await findOne("user", { telephone });
      if (!check_telephone) {
        return res
          .status(400)
          .send({ status: 400, message: "Number not exist" });
      }
      // Function for creating OTP key
      const otp_key = generateRandomNumber(111111, 999999).toFixed(0);
      await insertNewDocument("otp", {
        otp_key: bcrypt.hashSync(otp_key, bcrypt.genSaltSync(10)),
        telephone,
      });

      client.messages.create(
        {
          body: `Your OTP verification code is ${otp_key}`,
          from: "+19103874951", // company telephone
          to: telephone, // client telephone number (telephone)
        },
        (err, mess) => {
          if (err) {
            return res.status(400).send({ status: 400, message: err });
          }
          return res.status(400).send({ status: 200, message: mess.sid });
        }
      );
    }
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = forgetPassword;
