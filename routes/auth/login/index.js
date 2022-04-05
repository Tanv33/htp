const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET } = require("../../../config");
const {
  getPopulatedData,
  findOne,
  generateRandomNumber,
  insertNewDocument,
} = require("../../../helpers");
const Joi = require("joi");
const { send_email } = require("../../../lib");

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6),
});

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    await schema.validateAsync(req.body);
    // get matching emails
    const populatedUser = await getPopulatedData(
      "user",
      { email },
      "type",
      "type status"
    );
    const user = populatedUser[0];
    if (user) {
      // For Asins Specific
      if (user.type.type === "Asins") {
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
          return res
            .status(404)
            .send({ status: 400, message: "Invalid Email or Password!" });
        }
        user.password = undefined;
        if (user.type.status !== "Active") {
          return res.status(405).send({
            status: 405,
            message: "Your Admin Type is not Active",
          });
        }
        const verificationCode = generateRandomNumber(111111, 999999).toFixed(
          0
        );
        await insertNewDocument("verification", {
          email: user.email,
          verification_key: bcrypt.hashSync(
            verificationCode,
            bcrypt.genSaltSync(10)
          ),
        });
        // var token = jwt.sign({ user }, SECRET);
        // return res.status(200).send({ status: 200, user, token });
        send_email(
          res,
          "verificationCodeTemp",
          {
            username: user.full_name,
            verification: verificationCode,
            email: user.email,
            telephone: user.telephone,
          },
          "Health Titan Pro",
          "Verification Code",
          user.email
        );
        return res.status(200).send({
          status: 200,
          message: "Verification code send Successfully",
        });
      }
      // For Manager and others
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res
          .status(404)
          .send({ status: 400, message: "Invalid Email or Password!" });
      }
      user.password = undefined;
      if (user.type.status !== "Active") {
        return res.status(405).send({
          status: 405,
          message: "Your User Type is not Active",
        });
      }
      if (user.status !== "Active") {
        return res.status(401).send({
          status: 401,
          message: "Your signup request is not approved yet",
        });
      }
      // For Production Manager
      if (user.type.type === "Production Manager") {
        const verificationCode = generateRandomNumber(111111, 999999).toFixed(
          0
        );
        await insertNewDocument("verification", {
          email: user.email,
          verification_key: bcrypt.hashSync(
            verificationCode,
            bcrypt.genSaltSync(10)
          ),
        });
        send_email(
          res,
          "verificationCodeTemp",
          {
            username: user.full_name,
            verification: verificationCode,
            email: user.email,
            telephone: user.telephone,
            manager_logo: user.production_manager_logo,
          },
          "Health Titan Pro",
          "Verification Code",
          user.email
        );
        return res.status(200).send({
          status: 200,
          message: "Verification code send Successfully",
        });
      }
      // For Vendor
      if (user.type.type === "Vendor") {
        const token = jwt.sign({ user }, SECRET);
        console.log(user);
        return res.status(200).send({ status: 200, user, token });
      }
      // Matching type and mid with manager
      const findManagerId = await findOne("userType", { type: "Manager" });
      const { _id } = findManagerId;
      const get_match_mid = await getPopulatedData(
        "user",
        { mid: user.mid, type: _id },
        "type",
        "type"
      );
      if (!get_match_mid.length) {
        return res
          .status(404)
          .send({ status: 404, message: "There is no manager with your mid" });
      }
      if (user.type.type === "Manager") {
        const verificationCode = generateRandomNumber(111111, 999999).toFixed(
          0
        );
        await insertNewDocument("verification", {
          email: user.email,
          verification_key: bcrypt.hashSync(
            verificationCode,
            bcrypt.genSaltSync(10)
          ),
        });
        send_email(
          res,
          "verificationCodeTemp",
          {
            username: user.full_name,
            verification: verificationCode,
            email: user.email,
            telephone: user.telephone,
            manager_logo: user.manager_logo,
          },
          "Health Titan Pro",
          "Verification Code",
          user.email
        );
        return res.status(200).send({
          status: 200,
          message: "Verification code send Successfully",
        });
      }
      const token = jwt.sign({ user }, SECRET);
      console.log(user);
      return res.status(200).send({ status: 200, user, token });
    } else {
      return res
        .status(404)
        .send({ status: 404, message: "User does not exist!" });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = loginUser;
