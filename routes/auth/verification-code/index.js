const Joi = require("joi");
const { findOneSort, getPopulatedData } = require("../../../helpers");
const bcrypt = require("bcryptjs");
const { SECRET } = require("../../../config");
const jwt = require("jsonwebtoken");

const schema = Joi.object({
  email: Joi.string().email().required(),
  verification_code: Joi.string().min(6).required(),
});
const verifyCode = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const { email, verification_code } = req.body;
    const check_user = await findOneSort("verification", { email });
    if (!check_user) {
      return res
        .status(404)
        .send({ status: 404, message: "User Email not exist" });
    }
    const codeCreated = new Date(check_user.created).getTime();
    const now = new Date().getTime();
    const diff = now - codeCreated;
    if (diff > 600000 || check_user.used) {
      return res
        .status(403)
        .send({ status: 403, message: "Verificatoin code expire" });
    }
    const check_code = bcrypt.compareSync(
      verification_code,
      check_user.verification_key
    );
    if (!check_code) {
      return res
        .status(404)
        .send({ status: 400, message: "Wrong Verification Code" });
    }
    await check_user.updateOne({ used: true });
    const populatedUser = await getPopulatedData(
      "user",
      { email },
      "type",
      "type status"
    );
    const user = populatedUser[0];
    user.password = undefined;
    const token = jwt.sign({ user }, SECRET);
    // console.log(user);
    return res.status(200).send({ status: 200, user, token });
  } catch (e) {
    console.log("error in verify.js", e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = verifyCode;
