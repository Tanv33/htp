const Joi = require("joi");
const {
  insertNewDocument,
  findOne,
  pushIfNotExists,
} = require("../../helpers");

const schema = Joi.object({
  name: Joi.string().required(),
  types: Joi.array().required(),
});

const addTestType = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const manager = await findOne("userType", { type: "Manager" });
    const prductionManager = await findOne("userType", {
      type: "Production Manager",
    });
    const updateManagers = await pushIfNotExists(
      "user",
      {
        type: { $in: [manager._id, prductionManager._id] },
      },
      {
        user_test_type: req.body,
      }
    );
    const test_type = await insertNewDocument("testType", req.body);
    return res
      .status(200)
      .send({
        status: 200,
        test_type,
        message: "Test Type added successfully + Added to all managers",
      });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = addTestType;
