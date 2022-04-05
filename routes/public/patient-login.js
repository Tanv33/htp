const { findOne } = require("../../helpers");
const Joi = require("joi");

const patientLoginSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  date_of_birth: Joi.string().required(),
  pid: Joi.string().required(),
});

const patientLogin = async (req, res) => {
  try {
    await patientLoginSchema.validateAsync(req.query);
    const { first_name, last_name, date_of_birth, pid } = req.query;
    const patient = await findOne("patient", {
      first_name: {
        $regex: new RegExp("^" + first_name.toLowerCase() + "$", "i"),
      },
      last_name: {
        $regex: new RegExp("^" + last_name.toLowerCase() + "$", "i"),
      },
      date_of_birth,
      pid,
    });
    if (!patient) {
      return res.status(404).send({ status: 404, message: "No Patient Found" });
    }
    return res.status(200).send({ status: 200, patient });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = patientLogin;
