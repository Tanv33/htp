const Joi = require("joi");
const { findOne, getPopulatedDataWithLimit, getCount } = require("../../../helpers");

const newSchema = Joi.object({
  page: Joi.string().required(),
});

const getLocationPatient = async (req, res) => {
  try {
    await newSchema.validateAsync(req.query);
    const { page } = req.query;
    const manager = await findOne("user", { _id: req.userId });
    const { manager_location } = manager;
    const locationsPatients = await getPopulatedDataWithLimit(
      "patient",
      { location_id: { $in: manager_location }, is_tested: "Yes" },
      "location_id",
      "location_name",
      { _id: -1 },
      page,
      6
    );
    const length = await getCount("patient", {
      location_id: { $in: manager_location },
      is_tested: "Yes",
    });
    return res.status(200).send({ status: 200,length, locationsPatients });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = getLocationPatient;
