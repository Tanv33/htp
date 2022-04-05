const { updateDocument } = require("../../../helpers");
const Joi = require("joi");

let testItems = Joi.object().keys({
  name: Joi.string(),
  types: Joi.array(),
});

let patientItems = Joi.object().keys({
  field: Joi.string(),
  required: Joi.string(),
});

const schema = Joi.object({
  location_name: Joi.string(),
  email: Joi.string().email(),
  zip_code: Joi.string(),
  consent: Joi.string(),
  address: Joi.string(),
  city: Joi.string(),
  business_or_individual: Joi.string(),
  send_copy_to_email: Joi.boolean(),
  location_logo: Joi.string(),
  test: Joi.array().items(testItems),
  patient_required_fields: Joi.array().items(patientItems),
});

const updateLocation = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const updatedLocation = await updateDocument(
      "location",
      { _id: req.params.id },
      req.body
    );
    return res.status(200).send({
      status: 200,
      message: "Location Updated Successfully",
      updatedLocation,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = updateLocation;
