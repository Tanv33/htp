const Joi = require("joi");
const { getPopulatedDataWithLimit, getCount } = require("../../../helpers");

const newSchema = Joi.object({
  page: Joi.string().required(),
});
const getUnCollectedPatient = async (req, res) => {
  try {
    await newSchema.validateAsync(req.query);
    const { page } = req.query;
    const patients = await getPopulatedDataWithLimit(
      "patient",
      {
        created_by: req.userId,
        is_tested: "No",
      },
      "location_id",
      "location_name",
      { _id: -1 },
      page,
      6
    );
    const length = await getCount("patient", {
      created_by: req.userId,
      is_tested: "No",
    });
    return res.status(200).send({ status: 200, length, patients });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getUnCollectedPatient;
