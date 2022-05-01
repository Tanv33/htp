const { findOne, getAggregate } = require("../../../helpers");

const getAllManagerlocations = async (req, res) => {
  try {
    const manager = await findOne("userType", { type: "Manager" });
    const { _id } = manager;
    const medicalProfession = await findOne("userType", {
      type: "Medical Profession",
    });
    const labTechnician = await findOne("userType", { type: "Lab Technician" });

    const proManager = await findOne("userType", {
      type: "Production Manager",
    });
    const locations = await getAggregate("location", [
      {
        $match: {
          user_type: {
            $in: [_id, proManager._id],
          },
        },
      },
      {
        $lookup: {
          from: "user-types",
          localField: "user_type",
          foreignField: "_id",
          as: "user_type",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "created_by",
          foreignField: "_id",
          as: "created_by",
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
          _id: 1,
          location_name: 1,
          location_logo: 1,
          email: 1,
          cityemail: 1,
          address: 1,
          zip_code: 1,
          test: 1,
          "created_by._id": 1,
          "created_by.full_name": 1,
          "created_by.lab_name": 1,
          "created_by.lab_address": 1,
          "user_type._id": 1,
          "user_type.type": 1,
          noOfPatients: 1,
          noOfMedicalProfession: 1,
          noOfLabTechnician: 1,
        },
      },
    ]);
    return res
      .status(200)
      .send({ status: 200, length: locations.length, locations });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getAllManagerlocations;

// const { findOne, getPopulatedData, getCount } = require("../../../helpers");

// const getAllManagerlocations = async (req, res) => {
//   try {
//     // const findManagerId = await findOne("userType", { type: "Manager" });
//     // const { _id } = findManagerId;
//     // const managersArray = await getPopulatedData("location", {}, "created_by");
//     // return res.status(200).send({ status: 200, managersArray });
//     // return res.status(200).send({ status: 200, message: "Api is in progress" });
//     const findManagerId = await findOne("userType", { type: "Manager" });
//     // const allManagers = await find("user", { type: findManagerId });
//     const allManagers = await getPopulatedData(
//       "user",
//       { type: findManagerId._id },
//       "manager_location"
//     );
//     for (let i = 0; i < allManagers.length; i++) {
//       for (let a = 0; a < allManagers[i]?.manager_location?.length; a++) {
//         const noOfPatients = await getCount("patient", {
//           location_id: allManagers[i]?.manager_location[a]?._id,
//         });
//         const noOfEmployees = await getCount("user", {
//           employee_location: allManagers[i]?.manager_location[a]?._id,
//         });
//         allManagers[i].manager_location[a].noOfPatients = noOfPatients;
//         allManagers[i].manager_location[a].noOfEmployees = noOfEmployees;
//       }
//     }
//     return res.status(200).send({ status: 200, allManagers });
//   } catch (e) {
//     res.status(400).send({ status: 400, message: e.message });
//   }
// };

// module.exports = getAllManagerlocations;
