const Joi = require("joi");
const {
  findOne,
  todayDateFormat,
  updateDocument,
  generatePdf,
  generateRandomNumber,
  getDropBoxLink,
  findOneAndPopulate,
} = require("../../../helpers");
const { send_email } = require("../../../lib");
const testResultSignOff = require("../../../public/pdf/testResultSignoff");

const newSchema = Joi.object({
  order_no: Joi.number().required(),
  pid: Joi.string().required(),
  patient_result: Joi.string().required(),
});
const fireRapidPatient = async (req, res) => {
  try {
    await newSchema.validateAsync(req.body);
    const { order_no, pid, patient_result } = req.body;
    const findRapidPatient = await findOne("patient", {
      created_by: req.userId,
      is_tested: "Yes",
      "test_type.type": "Rapid",
      pid,
      order_no,
    });
    if (!findRapidPatient) {
      return res.status(404).send({
        status: 404,
        message: "Patient not found with your order no and pid",
      });
    }
    const currentPatient = await findOneAndPopulate(
      "patient",
      {
        created_by: req.userId,
        is_tested: "Yes",
        "test_type.type": "Rapid",
        order_no,
        pid,
      },
      "location_id"
    );
    const testResult = await generatePdf(
      testResultSignOff(
        currentPatient,
        "Your Covid Rapid Result is " + patient_result
      ),
      `./public/rapidfire pdf/rapid${generateRandomNumber(11111, 99999).toFixed(
        0
      )}.pdf`
    );
    // getting signaturepdf URL from Dropbox
    const rapidPdfLink = await getDropBoxLink(
      "/rapid fire  pdf/" +
        `rapid-${generateRandomNumber(11111, 99999).toFixed(0)}.pdf`,
      testResult.filename,
      false
    );
    req.body.patient_result_date = todayDateFormat();
    req.body.patient_test_result_sign_off = rapidPdfLink;
    await updateDocument(
      "patient",
      {
        created_by: req.userId,
        is_tested: "Yes",
        "test_type.type": "Rapid",
        order_no,
        pid,
      },
      req.body
    );
    send_email(
      res,
      "patientResultTemp",
      {
        fullName: currentPatient?.first_name + " " + currentPatient?.last_name,
        testNmae: currentPatient?.test_type?.type,
        testLocaiton: currentPatient?.location_id?.location_name,
        telephone: currentPatient?.telephone,
        locationDescription: currentPatient?.location_id?.consent,
        location_logo: currentPatient?.location_id?.location_logo,
      },
      "Health Titan Pro",
      "Your Covid Rapid result",
      currentPatient.email,
      [
        {
          filename: "rapid.pdf",
          path: testResult.filename, // Path of signature file
        },
      ]
    );
    return res
      .status(200)
      .send({ status: 200, message: "Patient result fired successfully" });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = fireRapidPatient;
