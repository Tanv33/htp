const { getPopulatedData, getCount, findOne } = require("../../../helpers");

const getAllLocation = async (req, res) => {
  try {
    var allLocations = await getPopulatedData(
      "user",
      { _id: req.userId },
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
      // let employees = await getCount("user", {
      //   employee_location: manager_location[index]._id,
      // });
      // let no_of_tested = await getCount("patient", {
      //   location_id: manager_location[index]._id,
      //   is_tested: "Yes",
      // });
      // let no_of_not_tested = await getCount("patient", {
      //   location_id: manager_location[index]._id,
      //   is_tested: "No",
      // });
      let no_of_medical_profession = await getCount("user", {
        employee_location: manager_location[index]._id,
        type: medicalProfession._id,
      });
      let no_of_lab_technician = await getCount("user", {
        employee_location: manager_location[index]._id,
        type: labTechnician._id,
      });
      // let no_of_covid_patient = await getCount("patient", {
      //   location_id: manager_location[index]._id,
      //   "test_type.name": "Covid",
      // });
      // let no_of_omicron_patient = await getCount("patient", {
      //   location_id: manager_location[index]._id,
      //   "test_type.name": "Omicron",
      // });
      // console.log(no_of_omicron_patient);
      // A single function for how many number of Covid and Omicron patient are there in the patient colloection
      manager_location[index].noOfPatient = patients;
      // manager_location[index].noOfEmployees = employees;
      // manager_location[index].noOfTested = no_of_tested;
      // manager_location[index].noOfNotTested = no_of_not_tested;
      manager_location[index].noOfMedicalProfession = no_of_medical_profession;
      manager_location[index].noOfLabTechnician = no_of_lab_technician;
      // manager_location[index].noOfCovidPatient = no_of_covid_patient;
      // manager_location[index].noOfOmicronPatient = no_of_omicron_patient;
    }
    return res
      .status(200)
      .send({ status: 200, allLocations: manager_location });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getAllLocation;
