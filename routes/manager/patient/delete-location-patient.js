const Joi = require("joi");
const { deleteDocument } = require("../../../helpers");

const schema = Joi.object({
  _id: Joi.string().required(),
});

const deleteLocationPatient = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const { _id } = req.body;
    await deleteDocument("patient", { _id });
    return res
      .status(200)
      .send({ status: 200, message: "Location Patient deleted Successfully" });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = deleteLocationPatient;
