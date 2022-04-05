const {
  getAggregate,
  findOne,
  getCount,
  findOneAndPopulate,
} = require("../../../helpers");

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
    const labTechnicican = await findOne("userType", {
      type: "Lab Technician",
    });
    let secondChart = [];
    for (let i = 0; i < manager_location.length; i++) {
      const noOfLabTechnician = await getCount("user", {
        employee_location: manager_location[i],
        type: labTechnicican._id,
      });
      const noOfMedicalProfession = await getCount("user", {
        employee_location: manager_location[i]?._id,
        type: medicalProfession._id,
      });
      let obj = {};
      obj.location_id = manager_location[i]?._id;
      obj.location_name = manager_location[i]?.location_name;
      obj.medicalProfession = noOfMedicalProfession;
      obj.labTechnicican = noOfLabTechnician;
      secondChart.push(obj);
    }

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
