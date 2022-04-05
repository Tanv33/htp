const Joi = require("joi");
const { getPopulatedData, getCount, findOne } = require("../../../helpers");

const schema = Joi.object({
  manager_id: Joi.string().required(),
});
const getManagerLocationBySearch = async (req, res) => {
  try {
    await schema.validateAsync(req.query);
    const { manager_id } = req.query;
    var allLocations = await getPopulatedData(
      "user",
      { _id: manager_id },
      "type manager_location"
    );
    const { manager_location } = allLocations[0];
    // console.log({ allLocations });
    const medicalProfession = await findOne("userType", {
      type: "Medical Profession",
    });
    const labTechnician = await findOne("userType", { type: "Lab Technician" });
    for (let index = 0; index < manager_location.length; index++) {
      let patients = await getCount("patient", {
        location_id: manager_location[index]._id,
      });

      let no_of_medical_profession = await getCount("user", {
        employee_location: manager_location[index]._id,
        type: medicalProfession._id,
      });
      let no_of_lab_technician = await getCount("user", {
        employee_location: manager_location[index]._id,
        type: labTechnician._id,
      });
      manager_location[index].noOfPatient = patients;
      manager_location[index].noOfMedicalProfession = no_of_medical_profession;
      manager_location[index].noOfLabTechnician = no_of_lab_technician;
    }
    return res
      .status(200)
      .send({ status: 200, allLocations: manager_location });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getManagerLocationBySearch;
