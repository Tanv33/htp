const Joi = require("joi");
const { getAggregate, findOne } = require("../../../helpers");

const schema = Joi.object({
  from: Joi.date().required(),
  to: Joi.date().required(),
});

const dateChart = async (req, res) => {
  try {
    await schema.validateAsync(req.query);
    const { from, to } = req.query;
    const vendor = await findOne("user", { _id: req.userId });
    const { vendor_locations } = vendor;
    console.log(vendor_locations);
    const graph1 = await getAggregate("patient", [
      {
        $match: {
          location_id: { $in: vendor_locations },
          createdAt: { $gte: new Date(from), $lte: new Date(to) },
        },
      },
      {
        $group: {
          _id: "$test_type.name",
          noOfPatient: {
            $sum: 1,
          },
        },
      },
    ]);
    return res.status(200).send({ status: 200, graph1 });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = dateChart;
