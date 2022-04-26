const Joi = require("joi");
const {
  getPopulatedData,
  getCount,
  findOne,
  getAggregate,
} = require("../../../helpers");
const { ObjectID } = require("../../../types");

const schema = Joi.object({
  manager_id: Joi.string().required(),
});
const getManagerLocationBySearch = async (req, res) => {
  try {
    await schema.validateAsync(req.query);
    const { manager_id } = req.query;
    const medicalProfession = await findOne("userType", {
      type: "Medical Profession",
    });
    const labTechnician = await findOne("userType", { type: "Lab Technician" });
    // Modifyed
    const allLocations = await getAggregate("location", [
      {
        $match: {
          created_by: ObjectID(manager_id),
        },
      },
      {
        $lookup: {
          from: "patients",
          localField: "_id",
          foreignField: "location_id",
          as: "noOfPatient",
        },
      },
      {
        $addFields: {
          noOfPatient: { $size: "$noOfPatient" },
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

module.exports = getManagerLocationBySearch;
