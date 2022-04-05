const { customUpdate, findOne } = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
});

const deleteNewTestType = async (req, res) => {
  try {
    await schema.validateAsync(req.query);
    const { id, name } = req.query;
    // Delete Specific Object
    const if_exist = await findOne("location", {
      _id: id,
      test: {
        $elemMatch: {
          name,
        },
      },
    });
    if (!if_exist) {
      return res
        .status(400)
        .send({ status: 400, message: "Your Given name not exist" });
    }
    await customUpdate(
      "location",
      {
        _id: id,
        test: {
          $elemMatch: {
            name,
          },
        },
      },
      {
        $pull: {
          test: {
            name,
          },
        },
      }
    );
    return res.status(200).send({
      status: 200,
      message: "test type deleted successfully",
    });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = deleteNewTestType;
