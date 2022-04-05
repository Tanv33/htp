const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { findOneSort } = require("../../../helpers");

const schema = Joi.object({
  preferred_method: Joi.string().required().valid("Email", "Telephone"),
  email: Joi.string()
    .email()
    .when("preferred_method", { is: "Email", then: Joi.required() }),
  telephone: Joi.string().min(14).when("preferred_method", {
    is: "Telephone",
    then: Joi.required(),
  }),
  otp_key: Joi.string().min(6).required(),
});

const confirmOtp = async (req, res) => {
  const { otp_key, email, telephone } = req.body;
  try {
    await schema.validateAsync(req.body);
    // For Email
    if (email) {
      const check_user = await findOneSort("otp", { email });
      if (!check_user) {
        return res
          .status(400)
          .send({ status: 400, message: "Email not exist" });
      }
      const otpCreated = new Date(check_user.created).getTime();
      const now = new Date().getTime();
      const diff = now - otpCreated;
      if (diff > 300000 || check_user.used) {
        return res.status(403).send({ status: 403, message: "OTP expire" });
      }
      const check_otp = bcrypt.compareSync(otp_key, check_user.otp_key);
      if (!check_otp) {
        return res.status(400).send({ status: 400, message: "Wrong OTP" });
      }
      return res.status(200).send({ status: 200, message: "OTP confirmed" });
    }
    // For Telephone
    if (telephone) {
      const check_telephone = await findOneSort("otp", { telephone });
      if (!check_telephone) {
        return res
          .status(400)
          .send({ status: 400, message: "Telephone not exist" });
      }
      const otpCreated = new Date(check_telephone.created).getTime();
      const now = new Date().getTime();
      const diff = now - otpCreated;
      if (diff > 300000 || check_telephone.used) {
        return res.status(403).send({ status: 403, message: "OTP expire" });
      }
      const check_otp = bcrypt.compareSync(otp_key, check_telephone.otp_key);
      if (!check_otp) {
        return res.status(400).send({ status: 400, message: "Wrong OTP" });
      }
      return res.status(200).send({ status: 200, message: "OTP confirmed" });
    }

    // check_email.otp_key;
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = confirmOtp;
