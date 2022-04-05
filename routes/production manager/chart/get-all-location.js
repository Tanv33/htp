const { getPopulatedData, getCount, findOne } = require("../../../helpers");

const getAllLocation = async (req, res) => {
  try {
    var allLocations = await getPopulatedData(
      "user",
      { _id: req.userId },
      "type production_manager_location"
    );
    let { production_manager_location } = allLocations[0];
    for (let index = 0; index < production_manager_location.length; index++) {
      let patients = await getCount("patient", {
        location_id: production_manager_location[index]._id,
      });
      production_manager_location[index].noOfPatient = patients;
    }
    production_manager_location = production_manager_location.map((element) => {
      return {
        _id: element?._id,
        location_name: element?.location_name,
        noOfPatient: element?.noOfPatient,
      };
    });
    return res
      .status(200)
      .send({ status: 200, allLocations: production_manager_location });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getAllLocation;
