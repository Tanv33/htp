const {
  getPopulatedData,
  getCount,
  findOne,
  getAggregate,
} = require("../../../helpers");
const { ObjectID } = require("../../../types");

const getAllLocation = async (req, res) => {
  try {
    const medicalProfession = await findOne("userType", {
      type: "Medical Profession",
    });
    const labTechnician = await findOne("userType", { type: "Lab Technician" });
    // Modifyed
    const allLocations = await getAggregate("location", [
      {
        $match: {
          created_by: ObjectID(req.userId),
        },
      },
      {
        $lookup: {
          from: "patients",
          localField: "_id",
          foreignField: "location_id",
          as: "noOfPatients",
        },
      },
      {
        $addFields: {
          noOfPatients: { $size: "$noOfPatients" },
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
        $addFields: {
          noOfMedicalProfession: {
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
          noOfLabTechnician: {
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
      {
        $project: {
          noOfEmployees: 0,
        },
      },
    ]);
    return res.status(200).send({ status: 200, allLocations });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getAllLocation;
