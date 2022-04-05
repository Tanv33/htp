const Joi = require("joi");
const { pushIfNotExists, findOneAndPopulate } = require("../../../helpers");

const schema = Joi.object({
  name: Joi.string().required(),
  types: Joi.array().required(),
});
const paramsSchema = Joi.object({
  id: Joi.string().required(),
});
const addNewTestType = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    await paramsSchema.validateAsync(req.params);
    const { id } = req.params;
    const { name, types } = req.body;
    const check_user = await findOneAndPopulate(
      "user",
      { _id: req.userId },
      "type"
    );
    // Asins
    if (check_user?.type?.type === "Asins") {
      // Add name and Types
      await pushIfNotExists(
        "location",
        {
          _id: id,
        },
        {
          test: { name, types },
        }
      );
      return res
        .status(200)
        .send({ status: 200, message: "test type added successfully" });
    }
    // Manager
    // Add name and Types
    await pushIfNotExists(
      "location",
      {
        _id: id,
        created_by: req.userId,
      },
      {
        test: { name, types },
      }
    );
    return res
      .status(200)
      .send({ status: 200, message: "test type added successfully" });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = addNewTestType;
