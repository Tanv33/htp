const Joi = require("joi");
const {
  base64regex,
  getDropBoxLink,
  _base64ToArrayBuffer,
  generateRandomNumber,
  findOneAndSelect,
  insertNewDocument,
  findOneAndUpdate,
  dateFormat,
} = require("../../../helpers");

const reTestSchema = Joi.object({
  pid: Joi.string().required(),
  // patient_signature: Joi.string().required(),
  test_type: Joi.object()
    .keys({
      name: Joi.string().required(),
      type: Joi.string().required(),
    })
    .required(),
});
const reTestPatient = async (req, res) => {
  try {
    await reTestSchema.validateAsync(req.body);
    // const { pid, patient_signature } = req.body;
    const { pid, test_type } = req.body;
    // if (!base64regex.test(patient_signature)) {
    //   return res.status(400).send({
    //     status: 400,
    //     message: "Patient Signature should be in base64",
    //   });
    // }
    // const patientSignatureLink = await getDropBoxLink(
    //   "/patient signature/" +
    //     `patient-signature-${generateRandomNumber(11111, 99999).toFixed(
    //       0
    //     )}.png`,
    //   _base64ToArrayBuffer(
    //     patient_signature.replace(/^data:image\/[a-z]+;base64,/, "")
    //   ),
    //   true
    // );
    const patient = await findOneAndSelect(
      "patient",
      { pid },
      "-_id -__v -created_date -createdAt -updatedAt -order_no -is_tested -bar_code -test_type"
    );
    if (!patient) {
      return res
        .status(404)
        .send({ status: 404, message: "No Patient Found with your given pid" });
    }
    const orderNoDoc = await findOneAndUpdate(
      "NumberGeneratorModel",
      { name: "pid" },
      { $inc: { value: 1 } },
      { new: true }
    );
    const orderNoValue = orderNoDoc.value;
    const orederNoSequenceNumber = (orderNoValue + "").padStart(4, "0");
    const order_no = dateFormat() + orederNoSequenceNumber;

    // patient.patient_signature = patientSignatureLink;
    patient.test_type = test_type;
    patient.order_no = order_no;

    const reCreatePatient = await insertNewDocument("patient", patient);
    return res.status(200).send({
      status: 200,
      message: "Patient Recreated Successfully",
      reCreatePatient,
    });
  } catch (e) {
    console.log("reTestPatient", e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = reTestPatient;
