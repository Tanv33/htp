const Joi = require("joi");
const { findOne, insertNewDocument } = require("../../../helpers");
const bcrypt = require("bcryptjs");

const vendorSchema = Joi.object({
  vendor_name: Joi.string().required(),
  vendor_locations: Joi.array().required(),
  email: Joi.string().email().required(),
  type: Joi.string().required(),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .required(),
});

const createVendor = async (req, res) => {
  try {
    // For Vendor
    await vendorSchema.validateAsync(req.body);
    const { type, email, password } = req.body;
    // manager
    const manager = await findOne("user", { _id: req.userId });
    const { mid } = manager;
    const check_email_exist = await findOne("user", { email });
    if (check_email_exist) {
      return res
        .status(404)
        .send({ status: 404, message: "User already exist!" });
    }
    const check_user_type_exist = await findOne("userType", { type });
    if (!check_user_type_exist) {
      return res
        .status(404)
        .send({ status: 404, message: "User Type not exist!" });
    }
    const { _id } = check_user_type_exist;
    const new_user = await insertNewDocument("user", {
      ...req.body,
      mid,
      type: _id,
      status: "Active",
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    });
    return res.status(200).send({ status: 200, user: new_user });
  } catch (e) {
    console.log("vendor Create Error ==>", e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = createVendor;
