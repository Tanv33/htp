const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { findOneSort, updateDocument } = require("../../../helpers");

const schema = Joi.object({
  otp_key: Joi.string().min(6).required(),
  password: Joi.string().required(),
  confirm_password: Joi.string().required().valid(Joi.ref("password")),
  preferred_method: Joi.string().required().valid("Email", "Telephone"),
  email: Joi.string()
    .email()
    .when("preferred_method", { is: "Email", then: Joi.required() }),
  telephone: Joi.string().min(14).when("preferred_method", {
    is: "Telephone",
    then: Joi.required(),
  }),
});

const checkPassword = async (req, res) => {
  const { otp_key, password, email, telephone } = req.body;
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
      const check_otp = bcrypt.compareSync(otp_key, check_user.otp_key);
      if (!check_otp) {
        return res.status(400).send({ status: 400, message: "Wrong OTP" });
      }
      if (check_user.used) {
        return res
          .status(400)
          .send({ status: 400, message: "This otp is used" });
      }
      await updateDocument(
        "user",
        { email },
        {
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        }
      );
      await check_user.updateOne({ used: true });
      return res
        .status(200)
        .send({ status: 200, message: "Password updated successfully" });
    }
    // For Telephone
    if (telephone) {
      const check_telephone = await findOneSort("otp", { telephone });
      if (!check_telephone) {
        return res
          .status(400)
          .send({ status: 400, message: "Telephone not exist" });
      }
      const check_otp = bcrypt.compareSync(otp_key, check_telephone.otp_key);
      if (!check_otp) {
        return res.status(400).send({ status: 400, message: "Wrong OTP" });
      }
      if (check_telephone.used) {
        return res
          .status(400)
          .send({ status: 400, message: "This otp is used" });
      }
      await updateDocument(
        "user",
        { telephone },
        {
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        }
      );
      await check_telephone.updateOne({ used: true });
      return res
        .status(200)
        .send({ status: 200, message: "Password updated successfully" });
    }

    // check_email.otp_key;
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = checkPassword;
