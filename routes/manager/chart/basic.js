const {
  getAggregate,
  findOne,
  getCount,
  findOneAndPopulate,
} = require("../../../helpers");
const { ObjectID } = require("../../../types");

const basicChart = async (req, res) => {
  try {
    // Graph 1
    const manager = await findOneAndPopulate(
      "user",
      { _id: req.userId },
      "manager_location",
      "location_name"
    );
    const { manager_location } = manager;
    const filterArr = manager_location.map((element) => element._id);
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
    const medicalProfession = await findOne("userType", {
      type: "Medical Profession",
    });
    const labTechnician = await findOne("userType", {
      type: "Lab Technician",
    });
    // Modifyed
    const secondChart = await getAggregate("location", [
      {
        $match: {
          created_by: ObjectID(req.userId),
        },
      },
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
          _id: 0,
          location_id: "$_id",
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
    return res
      .status(200)
      .send({ status: 200, firstChart, secondChart, thirdChart });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = basicChart;
