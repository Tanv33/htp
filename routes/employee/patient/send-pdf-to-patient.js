const Joi = require("joi");
const {
  findOne,
  generatePdf,
  generateRandomNumber,
  findOneAndPopulate,
} = require("../../../helpers");
const { send_email } = require("../../../lib");
const testResultSignOff = require("../../../public/pdf/testResultSignoff");

const newSchema = Joi.object({
  order_no: Joi.number().required(),
  pid: Joi.string().required(),
  //   patient_result: Joi.string().required(),
});
const sendPdfToPatient = async (req, res) => {
  try {
    await newSchema.validateAsync(req.body);
    const { order_no, pid } = req.body;
    const findPatient = await findOne("patient", {
      created_by: req.userId,
      is_tested: "Yes",
      pid,
      order_no,
    });
    if (!findPatient) {
      return res.status(404).send({
        status: 404,
        message: "Patient not found with your order no and pid",
      });
    }
    if (!findPatient?.patient_result?.length) {
      return res.status(404).send({
        status: 404,
        message: "Patient result not fired yet",
      });
    }
    const currentPatient = await findOneAndPopulate(
      "patient",
      {
        created_by: req.userId,
        is_tested: "Yes",
        order_no,
        pid,
      },
      "location_id"
    );
    const testResult = await generatePdf(
      testResultSignOff(
        currentPatient,
        "Your Result is " + findPatient?.patient_result?.length
      ),
      `./public/patient pdf/result${generateRandomNumber(11111, 99999).toFixed(
        0
      )}.pdf`
    );
    send_email(
      res,
      "patientResultTemp",
      {
        fullName: currentPatient?.first_name + " " + currentPatient?.last_name,
        testName: currentPatient?.test_type?.type,
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
          filename: "result.pdf",
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

module.exports = sendPdfToPatient;
