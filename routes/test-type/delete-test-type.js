const { deleteDocument } = require("../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  _id: Joi.string().required(),
});

const deleteTestType = async (req, res) => {
  const { _id } = req.body;
  try {
    await schema.validateAsync(req.body);
    const deleteQuery = { _id };
    let response = await deleteDocument("testType", deleteQuery);
    return res.status(200).send({ status: 200, response });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = deleteTestType;
