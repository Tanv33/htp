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
      });
      const noOfMedicalProfession = await getCount("user", {
        employee_location: looping[i]?._id,
        type: medicalProfession._id,
      });
      let obj = {};
      obj.location_id = looping[i]?._id;
      obj.location_name = looping[i]?.location_name;
      obj.medicalProfession = noOfMedicalProfession;
      obj.labTechnicican = noOfLabTechnician;
      secondChart.push(obj);
    }

    // Graph 2 Modifyed
    // const thirdy = await getAggregate("location", [
    //   { $match: {} },
    //   // {
    //   //   $group: {
    //   //     _id: "$_id",
    //   //     medicalProfession:{}
    //   //   },
    //   // },
    //   {
    //     $lookup: {
    //       from: "users",
    //       // localField: "_id",
    //       // foreignField: "employee_location",
    //       pipline: [
    //         {
    //           $match: {},
    //         },
    //       ],
    //       as: "noOfEmployee",
    //     },
    //   },
    //   // {
    //   //   $project: { location_name: 1 },
    //   // },
    // ]);

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
    // return res.status(200).send({ status: 200, length: thirdy.length, thirdy });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = basicChart;
