const Joi = require("joi");
const {
  findOne,
  find,
  getPopulatedData,
  getPopulatedDataWithLimit,
  getCount,
} = require("../../../helpers");

const schema = Joi.object({
  page: Joi.string().required(),
});
const getManagers = async (req, res) => {
  try {
    await schema.validateAsync(req.query);
    const { page } = req.query;
    const findManagerId = await findOne("userType", { type: "Manager" });
    const { _id } = findManagerId;
    const managersArray = await getPopulatedDataWithLimit(
      "user",
      {
        type: _id,
      },
      "type manager_location",
      "",
      { _id: -1 },
      page,
      6
    );
    const length = await getCount("user", {
      type: _id,
    });
    return res.status(200).send({ status: 200,length, managersArray });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getManagers;
