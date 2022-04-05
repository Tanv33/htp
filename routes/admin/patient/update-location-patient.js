const Joi = require("joi");
const { updateDocument } = require("../../../helpers");

const schema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  date_of_birth: Joi.date(),
  gender: Joi.string(),
  pregnant: Joi.string(),
  sex_assign_at_birth: Joi.string(),
  race: Joi.string(),
  language: Joi.string(),
  ethnicity: Joi.string(),
  marital_status: Joi.string(),
  email: Joi.string().email(),
  telephone: Joi.string(),
  address: Joi.string(),
  state: Joi.string(),
  city: Joi.string(),
  postal_code: Joi.string(),
  payment: Joi.string(),
  employment: Joi.string(),
  insurance_name: Joi.string(),
  insurance_policy_number: Joi.string(),
  us_id: Joi.string(),
  us_id_no: Joi.string(),
  ssn: Joi.string(),
  is_tested: Joi.string(),
  test_type: Joi.object(),
  pid: Joi.string(),
  bar_code: Joi.string(),
});

const updatePatient = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const locationPatientUpdated = await updateDocument(
      "patient",
      { _id: req.params.id },
      req.body
    );
    return res.status(200).send({
      status: 200,
      message: "Location Patient Updated Successfully",
      locationPatientUpdated,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = updatePatient;
