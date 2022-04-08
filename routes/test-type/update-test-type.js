const {
  updateDocument,
  updateManyDocument,
  findOne,
} = require("../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string(),
  preName: Joi.string(),
  types: Joi.array(),
});

const updateTestType = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const { name, preName, types } = req.body;
    const manager = await findOne("userType", { type: "Manager" });
    const prductionManager = await findOne("userType", {
      type: "Production Manager",
    });
    const findObject = await findOne("testType", { _id: req.params.id });
    if (!findObject) {
      return res
        .status(404)
        .send({ status: 404, message: "No Test Type Found" });
    }
    // Update Name
    if (preName) {
      if (!name) {
        return res
          .status(400)
          .send({ status: 400, message: "name is required" });
      }
      await updateManyDocument(
        "user",
        {
          type: { $in: [manager._id, prductionManager._id] },
          user_test_type: {
            $elemMatch: {
              name: findObject.name,
            },
          },
        },
        {
          "user_test_type.$.name": name,
        }
      );
      await updateDocument("testType", { _id: req.params.id }, { name });
      return res.status(200).send({
        status: 200,
        message: "Name Updated successfully + Updated to all Managers",
      });
    }

    // Update Types
    if (types) {
      await updateManyDocument(
        "user",
        {
          type: { $in: [manager._id, prductionManager._id] },
          user_test_type: {
            $elemMatch: {
              name: findObject.name,
            },
          },
        },
        {
          "user_test_type.$.types": types,
        }
      );
      await updateDocument(
        "testType",
        {
          _id: req.params.id,
        },
        {
          types,
        }
      );
      return res.status(200).send({
        status: 200,
        message: "Test Type updated Successfully + Updated to all Managers",
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

module.exports = updateTestType;
