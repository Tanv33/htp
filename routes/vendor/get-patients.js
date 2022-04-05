const Joi = require("joi");
const { findOne, getDataWithLimit, getCount } = require("../../helpers");

const schema = Joi.object({
  page: Joi.string().required(),
});

const getPatient = async (req, res) => {
  try {
    await schema.validateAsync(req.query);
    const { page } = req.query;
    const getUser = await findOne("user", { _id: req.userId });
    console.log(getUser);
    const getTestedPatients = await getDataWithLimit(
      "patient",
      {
        location_id: { $in: getUser.vendor_locations },
        is_tested: "Yes",
      },
      { _id: -1 },
      page,
      6
    );
    const length = await getCount("patient", {
      location_id: { $in: getUser.vendor_locations },
      is_tested: "Yes",
    });
    return res.status(200).send({
      status: 200,
      length,
      getTestedPatients,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = getPatient;
