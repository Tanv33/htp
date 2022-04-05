const { getPopulatedDataWithLimit, getCount } = require("../../../helpers");
const Joi = require("joi");

const newSchema = Joi.object({
  page: Joi.string().required(),
});

const getAllLocationPatients = async (req, res) => {
  try {
    await newSchema.validateAsync(req.query);
    const { page } = req.query;
    const allLocationPatients = await getPopulatedDataWithLimit(
      "patient",
      {
        production: { $ne: true },
      },
      "location_id created_by",
      "location_name first_name last_name",
      { _id: -1 },
      page,
      6
    );

    const length = await getCount("patient", {
      production: { $ne: true },
    });
    return res.status(200).send({
      status: 200,
      length,
      allLocationPatients,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = getAllLocationPatients;
