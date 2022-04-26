const { getAggregate, findOne, getCount, find } = require("../../../helpers");
const { ObjectID } = require("../../../types");

const basicChart = async (req, res) => {
  try {
    // Graph 1
    const firstChart = await getAggregate("patient", [
      {
        $match: {},
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

    const medicalProfession = await findOne("userType", {
      type: "Medical Profession",
    });
    const labTechnician = await findOne("userType", {
      type: "Lab Technician",
    });
    // Graph 2 Modifyed
    const secondChart = await getAggregate("location", [
      { $match: {} },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "employee_location",
          as: "noOfEmployees",
        },
      },
      {
        $project: {
          location_name: 1,
          medicalProfession: {
            $sum: {
              $map: {
                input: "$noOfEmployees",
                as: "noOfEmployees",
                in: {
                  $cond: [
                    { $eq: ["$$noOfEmployees.type", medicalProfession._id] },
                    1,
                    0,
                  ],
                },
              },
            },
          },
          labTechnician: {
            $sum: {
              $map: {
                input: "$noOfEmployees",
                as: "noOfEmployees",
                in: {
                  $cond: [
                    { $eq: ["$$noOfEmployees.type", labTechnician._id] },
                    1,
                    0,
                  ],
                },
              },
            },
          },
        },
      },
    ]);

    // Graph 3
    const thirdChart = await getAggregate("patient", [
      {
        $match: {},
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
    return res
      .status(200)
      .send({ status: 200, firstChart, secondChart, thirdChart });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = basicChart;
