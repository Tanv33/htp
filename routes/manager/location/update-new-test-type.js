const { updateDocument, findOne } = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  id: Joi.string().required(),
  preName: Joi.string(),
  name: Joi.string(),
  types: Joi.array(),
});

const updateNewTestType = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const { id, preName, name, types } = req.body;
    // Update Name
    if (preName) {
      await updateDocument(
        "location",
        {
          _id: id,
          test: {
            $elemMatch: {
              name: preName,
            },
          },
        },
        {
          "test.$.name": name,
        }
      );
      return res.status(200).send({
        status: 200,
        message: "Test Name  Updated Successfully",
      });
    }
    // Update Array
    if (types) {
      await updateDocument(
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
          "test.$.types": types,
        }
      );
      return res.status(200).send({
        status: 200,
        message: "Types Updated Successfully",
      });
    }
    return res.status(400).send({
      status: 200,
      message: "Please input correct credentials",
    });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = updateNewTestType;
