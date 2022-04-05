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

    // Graph 2
    const medicalProfession = await findOne("userType", {
      type: "Medical Profession",
    });
    const labTechnicican = await findOne("userType", {
      type: "Lab Technician",
    });
    let secondChart = [];
    const looping = await find("location", {});
    for (let i = 0; i < looping.length; i++) {
      const noOfLabTechnician = await getCount("user", {
        employee_location: looping[i]?._id,
        type: labTechnicican._id,
        createdAt: { $gte: new Date(from), $lte: new Date(to) },
      });
      const noOfMedicalProfession = await getCount("user", {
        employee_location: looping[i]?._id,
        type: medicalProfession._id,
        createdAt: { $gte: new Date(from), $lte: new Date(to) },
      });
      let obj = {};
      obj.location_id = looping[i]?._id;
      obj.location_name = looping[i]?.location_name;
      obj.medicalProfession = noOfMedicalProfession;
      obj.labTechnicican = noOfLabTechnician;
      secondChart.push(obj);
    }

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
