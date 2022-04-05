var patientSchema = require("mongoose").model("patient");

const getPatientForm = async (req, res) => {
  try {
    let patientForm = [];
    const schemaObj = patientSchema.schema.obj;
    let wrongValues = [
      "location_id",
      "is_tested",
      "created_by",
      "signature",
      "consent_link",
      "pid",
      "pid_link",
      "created_date",
      "covid_test_form",
      "patient_test_result_sign_off",
      "tested_by",
      "tested_date",
      "order_no",
      "is_review",
      "test_type",
      "patient_signature",
      "bar_code",
    ];
    for (const key in schemaObj) {
      if (!wrongValues.includes(key)) {
        patientForm.push(key);
      }
    }
    return res.status(200).send({ status: 200, patientForm });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = getPatientForm;
