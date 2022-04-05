const { getPopulatedData } = require("../../../helpers");
// const requiredTemplate = require("../../public/patient required field template");

const getRequiredFields = async (req, res) => {
  try {
    // const medicalProfession = await findOne("user", { _id: req.userId });
    const medicalProfession = await getPopulatedData(
      "user",
      { _id: req.userId },
      "type employee_location"
    );
    const { employee_location } = medicalProfession[0];
    // console.log(employee_location);
    if (!employee_location) {
      return res
        .status(404)
        .send({ status: 404, message: "No Required Field Found" });
    }
    return res.status(200).send({
      status: 200,
      employee_location,
    });
    // const { test, patient_required_fields } = employee_location;
    // const template = requiredTemplate(patient_required_fields);
    // return res.status(200).send({
    //   status: 200,
    //   template,
    //   test,
    // });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getRequiredFields;
