const Joi = require("joi");
const {
  findOne,
  updateDocument,
  findOneAndPopulate,
} = require("../../helpers");
const bcrypt = require("bcryptjs");

const schema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  full_name: Joi.string(),
  address: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  zip_code: Joi.string(),
  telephone: Joi.string().min(17),
  email: Joi.string().email(),
  password: Joi.string(),
  date_of_birth: Joi.date(),
  mid: Joi.string(),
  pmid: Joi.string(),
  status: Joi.string(),
  vendor_name: Joi.string(),
  //   user_test_type: Joi.string(),
  //   vendor_locations: Joi.string(),
  //   employee_location: Joi.string(),
  //   production_manager_location: Joi.string(),
  //   manager_location: Joi.string(),
  //   manager_logo: Joi.string(),
  //   manager_signature: Joi.string(),
  //   production_manager_logo: Joi.string(),
  //   production_manager_signature: Joi.string(),
  //   lab_name: Joi.string(),
  //   lab_address: Joi.string(),
});

const updateProfile = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const { password } = req.body;
    const _id = req.params.id;
    const check_user_exist = await findOne("user", { _id });
    if (!check_user_exist) {
      return res
        .status(404)
        .send({ status: 404, message: "No User Found With Your Given ID" });
    }
    if (password) {
      req.body.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
    await updateDocument("user", { _id }, req.body);
    const user = await findOneAndPopulate(
      "user",
      { _id },
      "type",
      "type status"
    );
    user.password = undefined;
    return res
      .status(200)
      .send({ status: 200, message: "Profile Updated Successfully", user });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = updateProfile;
