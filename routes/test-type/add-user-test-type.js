const Joi = require("joi");
const {
  findOne,
  pushIfNotExists,
  findOneAndPopulate,
} = require("../../helpers");

const adminSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  types: Joi.array().required(),
});

const schema = Joi.object({
  name: Joi.string().required(),
  types: Joi.array().required(),
});

const addUserTestType = async (req, res) => {
  try {
    const check_user = await findOneAndPopulate(
      "user",
      { _id: req.userId },
      "type"
    );
    if (check_user?.type?.type === "Asins") {
      await adminSchema.validateAsync(req.body);
      const { name, types, id } = req.body;
      // Add name and Types
      await pushIfNotExists(
        "user",
        {
          _id: id,
        },
        {
          user_test_type: { name, types },
        }
      );
      const user = await findOne("user", {
        _id: id,
      });
      const { user_test_type } = user;
      return res.status(200).send({
        status: 200,
        user_test_type,
      });
    }
    await schema.validateAsync(req.body);
    const { name, types } = req.body;
    // Add name and Types
    await pushIfNotExists(
      "user",
      {
        _id: req.userId,
      },
      {
        user_test_type: { name, types },
      }
    );
    const user = await findOne("user", {
      _id: req.userId,
    });
    const { user_test_type } = user;
    return res.status(200).send({
      status: 200,
      user_test_type,
    });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = addUserTestType;
