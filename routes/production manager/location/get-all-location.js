const { getPopulatedData, getCount, findOne } = require("../../../helpers");

const getAllLocation = async (req, res) => {
  try {
    var allLocations = await getPopulatedData(
      "user",
      { _id: req.userId },
      "type production_manager_location"
    );
    const { production_manager_location } = allLocations[0];
    // console.log({ allLocations });
    if (!production_manager_location.length) {
      return res
        .status(400)
        .send({ status: 400, message: "No Location Found" });
    }
    for (let index = 0; index < production_manager_location?.length; index++) {
      let patients = await getCount("patient", {
        location_id: production_manager_location[index]._id,
      });
      let no_of_tested = await getCount("patient", {
        location_id: production_manager_location[index]._id,
        is_tested: "Yes",
      });
      let no_of_not_tested = await getCount("patient", {
        location_id: production_manager_location[index]._id,
        is_tested: "No",
      });
      let no_of_covid_patient = await getCount("patient", {
        location_id: production_manager_location[index]._id,
        "test_type.name": "Covid",
      });
      let no_of_omicron_patient = await getCount("patient", {
        location_id: production_manager_location[index]._id,
        "test_type.name": "Omicron",
      });
      // console.log(no_of_omicron_patient);
      // A single function for how many number of Covid and Omicron patient are there in the patient colloection
      production_manager_location[index].noOfPatient = patients;
      production_manager_location[index].noOfTested = no_of_tested;
      production_manager_location[index].noOfNotTested = no_of_not_tested;
      production_manager_location[index].noOfCovidPatient = no_of_covid_patient;
      production_manager_location[index].noOfOmicronPatient =
        no_of_omicron_patient;
    }
    return res
      .status(200)
      .send({ status: 200, allLocations: production_manager_location });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getAllLocation;
