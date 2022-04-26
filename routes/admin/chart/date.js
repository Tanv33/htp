const Joi = require("joi");
const { getAggregate, findOne, getCount, find } = require("../../../helpers");

const schema = Joi.object({
  from: Joi.date().required(),
  to: Joi.date().required(),
});

const dateChart = async (req, res) => {
  try {
    await schema.validateAsync(req.query);
    const { from, to } = req.query;
    // Graph 1
    const firstChart = await getAggregate("patient", [
      {
        $match: {
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

    const medicalProfession = await findOne("userType", {
      type: "Medical Profession",
    });
    const labTechnicican = await findOne("userType", {
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
                    {
                      $and: [
                        {
                          $eq: ["$$noOfEmployees.type", medicalProfession._id],
                        },
                        { $gte: ["$$noOfEmployees.createdAt", new Date(from)] },
                        { $lte: ["$$noOfEmployees.createdAt", new Date(to)] },
                      ],
                    },
                    1,
                    0,
                  ],
                },
              },
            },
          },
          labTechnicican: {
            $sum: {
              $map: {
                input: "$noOfEmployees",
                as: "noOfEmployees",
                in: {
                  $cond: [
                    {
                      $and: [
                        {
                          $eq: ["$$noOfEmployees.type", labTechnicican._id],
                        },
                        { $gte: ["$$noOfEmployees.createdAt", new Date(from)] },
                        { $lte: ["$$noOfEmployees.createdAt", new Date(to)] },
                      ],
                    },
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
        $match: {
          createdAt: { $gte: new Date(from), $lte: new Date(to) },
        },
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
module.exports = dateChart;
