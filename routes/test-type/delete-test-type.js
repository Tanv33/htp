const { deleteDocument, customUpdate, findOne } = require("../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  _id: Joi.string().required(),
});

const deleteTestType = async (req, res) => {
  const { _id } = req.body;
  try {
    await schema.validateAsync(req.body);
    const deleteQuery = { _id };
    const findTestTypeToDel = await findOne("testType", deleteQuery);
    if (!findTestTypeToDel) {
      return res
        .status(404)
        .send({ status: 404, message: "No test type found" });
    }
    const { name } = findTestTypeToDel;
    const manager = await findOne("userType", { type: "Manager" });
    const prductionManager = await findOne("userType", {
      type: "Production Manager",
    });
    const managers = await customUpdate(
      "user",
      {
        type: { $in: [manager._id, prductionManager._id] },
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
    let response = await deleteDocument("testType", deleteQuery);
    return res.status(200).send({
      status: 200,
      message: "Test Type deleted successfully + removed from all managers",
    });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = deleteTestType;
