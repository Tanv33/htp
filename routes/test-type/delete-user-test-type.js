const { findOne, customUpdate, findOneAndPopulate } = require("../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
});
const adminSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
});

const deleteUserTestType = async (req, res) => {
  try {
    const check_user = await findOneAndPopulate(
      "user",
      { _id: req.userId },
      "type"
    );
    if (check_user?.type?.type === "Asins") {
      await adminSchema.validateAsync(req.query);
      const { name, id } = req.query;
      // Delete Specific Object
      await customUpdate(
        "user",
        {
          _id: id,
          user_test_type: {
            $elemMatch: {
              name,
            },
          },
        },
        {
          $pull: {
            user_test_type: {
              name,
            },
          },
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
    await schema.validateAsync(req.query);
    const { name } = req.query;
    // Delete Specific Object
    await customUpdate(
      "user",
      {
        _id: req.userId,
        user_test_type: {
          $elemMatch: {
            name,
          },
        },
      },
      {
        $pull: {
          user_test_type: {
            name,
          },
        },
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

module.exports = deleteUserTestType;
