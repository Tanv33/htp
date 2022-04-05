const {
  insertNewDocument,
  pushIfNotExists,
  getDropBoxLink,
  generateRandomNumber,
  findOne,
} = require("../../../helpers");
const Joi = require("joi");
const fs = require("fs");

let testItems = Joi.object().keys({
  name: Joi.string().required(),
  types: Joi.array().required(),
});

let patientItems = Joi.object().keys({
  field: Joi.string().required(),
  required: Joi.string().required(),
});

const schema = Joi.object({
  location_name: Joi.string().required(),
  email: Joi.string().email().required(),
  zip_code: Joi.string().required(),
  consent: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  business_or_individual: Joi.string(),
  send_copy_to_email: Joi.boolean(),
  // state: Joi.string().required(),
  location_logo: Joi.string(),
  test: Joi.array().items(testItems).required(),
  patient_required_fields: Joi.array().items(patientItems).required(),
});

const createLocation = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const production_manager = await findOne("userType", {
      type: "Production Manager",
    });

    // res.send(req.body);

    if (!req.body.location_logo) {
      if (!req.file) {
        return res
          .status(400)
          .send({ status: 400, message: "Location Logo Required" });
      }
    }
    if (req.file) {
      req.body.location_logo = await getDropBoxLink(
        "/location logo/" +
          generateRandomNumber(1111, 9999) +
          "-" +
          req.file.filename,
        req.file.path
      );
      await fs.unlinkSync(req.file.path);
    }
    req.body.created_by = req.userId;
    req.body.user_type = production_manager?._id;
    const locationCreated = await insertNewDocument("location", req.body);
    const { _id } = locationCreated;
    console.log({ locationCreated });
    await pushIfNotExists(
      "user",
      { _id: req.userId },
      { production_manager_location: _id }
    );
    return res
      .status(200)
      .send({ status: 200, message: "Location Created Successfully" });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = createLocation;
