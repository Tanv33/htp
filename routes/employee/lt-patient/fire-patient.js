const Joi = require("joi");
const {
  findOne,
  findOneAndPopulate,
  generatePdf,
  generateRandomNumber,
  getDropBoxLink,
  todayDateFormat,
  updateDocument,
} = require("../../../helpers");
const { send_email } = require("../../../lib");
const testResultSignOff = require("../../../public/pdf/testResultSignoff");

const newSchema = Joi.object({
  order_no: Joi.number().required(),
  pid: Joi.string().required(),
  patient_result: Joi.string().required(),
});

const firePatient = async (req, res) => {
  try {
    await newSchema.validateAsync(req.body);
    const { order_no, pid, patient_result } = req.body;
    const findPatient = await findOneAndPopulate(
      "patient",
      {
        is_tested: "Yes",
        pid,
        order_no,
      },
      "location_id"
    );
    if (!findPatient) {
      return res.status(400).send({
        status: 400,
        message: "No Patient Found with your given credentials",
      });
    }
    const testResult = await generatePdf(
      testResultSignOff(
        findPatient,
        "Your Covid Rapid Result is " + patient_result
      ),
      `./public/rapidfire pdf/rapid${generateRandomNumber(11111, 99999).toFixed(
        0
      )}.pdf`
    );
    // getting signaturepdf URL from Dropbox
    const firePatientPdfLink = await getDropBoxLink(
      "/fire  pdf/" +
        `${order_no}-${generateRandomNumber(11111, 99999).toFixed(0)}.pdf`,
      testResult.filename,
      false
    );
    req.body.patient_result_date = todayDateFormat();
    req.body.patient_test_result_sign_off = firePatientPdfLink;
    await updateDocument(
      "patient",
      {
        is_tested: "Yes",
        order_no,
        pid,
      },
      req.body
    );
    send_email(
      res,
      "patientResultTemp",
      {
        fullName: findPatient?.first_name + " " + findPatient?.last_name,
        testNmae: findPatient?.test_type?.type,
        testLocaiton: findPatient?.location_id?.location_name,
        telephone: findPatient?.telephone,
        locationDescription: findPatient?.location_id?.consent,
        location_logo: findPatient?.location_id?.location_logo,
      },
      "Health Titan Pro",
      "Your Covid Rapid result",
      findPatient.email,
      [
        {
          filename: "result.pdf",
          path: testResult.filename, // Path of signature file
        },
      ]
    );
    return res
      .status(200)
      .send({ status: 200, message: "Patient result fired successfully" });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = firePatient;
