const { getAggregate } = require("../../../helpers");
const { ObjectID } = require("../../../types");

const basicGraph = async (req, res) => {
  try {
    // Graph 1
    const graph1 = await getAggregate("patient", [
      {
        $match: { created_by: ObjectID(req.userId) },
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
    const graph2 = await getAggregate("patient", [
      {
        $match: { created_by: ObjectID(req.userId) },
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
    return res.status(200).send({ status: 200, graph1, graph2 });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = basicGraph;
