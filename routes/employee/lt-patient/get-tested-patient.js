const Joi = require("joi");
const { findOne, getDataWithLimit, getCount } = require("../../../helpers");

const schema = Joi.object({
  page: Joi.string().required(),
});

const getTestedtPatient = async (req, res) => {
  try {
    await schema.validateAsync(req.query);
    const { page } = req.query;
    const user = await findOne("user", { _id: req.userId });
    const { employee_location } = user;
    const patients = await getDataWithLimit(
      "patient",
      {
        location_id: employee_location,
        is_tested: "Yes",
        "test_type.type": { $ne: "Rapid" },
      },
      { _id: -1 },
      page,
      6
    );
    const length = await getCount("patient", {
      location_id: employee_location,
      is_tested: "Yes",
      "test_type.type": { $ne: "Rapid" },
    });
    return res.status(200).send({ status: 200, length, patients });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = getTestedtPatient;
