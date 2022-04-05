const { getAggregate, findOneAndPopulate } = require("../../../helpers");

const basicChart = async (req, res) => {
  try {
    // Graph 1
    const productionManager = await findOneAndPopulate(
      "user",
      { _id: req.userId },
      "production_manager_location",
      "location_name"
    );
    const { production_manager_location } = productionManager;
    const filterArr = production_manager_location.map((element) => element._id);
    const firstChart = await getAggregate("patient", [
      {
        $match: { location_id: { $in: filterArr } },
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

    // Graph 2
    const secondChart = await getAggregate("patient", [
      {
        $match: { location_id: { $in: filterArr } },
      },
      {
        $group: {
          _id: { type: "$test_type.type", name: "$test_type.name" },
          noOfPatient: {
            $sum: 1,
          },
        },
      },
      {
        $sort: { "_id.name": 1 },
      },
    ]);
    return res.status(200).send({ status: 200, firstChart, secondChart });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = basicChart;
