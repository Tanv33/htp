const Joi = require("joi");
const {
  insertNewDocument,
  findOne,
  helperFunctionForQrCode,
  getPopulatedData,
  getDropBoxLink,
  _base64ToArrayBuffer,
  generatePdf,
  generateRandomNumber,
  base64regex,
  dateFormat,
  findOneAndUpdate,
} = require("../../../helpers");
const { send_email } = require("../../../lib");
const signatureHtml = require("../../../public/pdf/Singnature");
const consentHtml = require("../../../public/pdf/tetindConsent");
const fs = require("fs");

// let testItems = Joi.object().keys({
//   name: Joi.string().required(),
//   types: Joi.array().required(),
// });

const addPatient = async (req, res) => {
  try {
    const user = await findOne("user", { _id: req.userId });
    const medicalProfession = await getPopulatedData(
      "user",
      { _id: req.userId },
      "employee_location"
    );
    console.log(medicalProfession);
    if (!medicalProfession.length) {
      return res.status(400).send({
        status: 400,
        message: "There is no location created by your manager",
      });
    }
    const { employee_location } = medicalProfession[0];
    // console.log(employee_location);
    if (!employee_location) {
      return res
        .status(404)
        .send({ status: 404, message: "Sorry No Location Found" });
    }
    const { patient_required_fields } = employee_location;
    // creating an empty object and looping values from manager required fields and inserting keys which are required values and keys values are Joi.required()
    let obj = {};
    // Array
    // console.log({ patient_required_fields });
    patient_required_fields.map((item) => {
      if (item?.required === "true" || item?.required === true) {
        obj[item?.field] = Joi.string().required();
      } else {
        obj[item?.field] = Joi.string();
      }
    });
    obj.patient_signature = Joi.required();

    //  Object
    // for (const key in patient_required_fields) {
    //   // console.log(key.required);
    //   if (patient_required_fields[key].required) {
    //     obj[key] = Joi.required();
    //   }
    // }
    // obj.patient_signature = Joi.required();
    // console.log(obj);
    if (req.body.gender === "Female") {
      obj.pregnant = Joi.required();
      if (!req.body.pregnant) {
        return res
          .status(400)
          .send({ status: 400, message: "Pregnant field required" });
      }
    }
    if (req.body.payment === "Insurance") {
      obj.insurance_name = Joi.required();
      obj.insurance_policy_number = Joi.required();
      if (!req.body.insurance_name || !req.body.insurance_policy_number) {
        return res.status(400).send({
          status: 400,
          message:
            "All Insurance field required like insurance_name, insurance_policy_number, insurance_image",
        });
      }
    }
    if (req.body.us_id === "Yes") {
      obj.us_id_no = Joi.required();
      if (!req.body.us_id_no) {
        return res.status(400).send({
          status: 400,
          message: "Us Id Number required",
        });
      }
    }
    if (req.body.us_id === "No") {
      obj.ssn = Joi.required();
      if (!req.body.ssn) {
        return res.status(400).send({
          status: 400,
          message: "SSN required",
        });
      }
    }
    let paymentArr = ["Production", "Employment"];
    if (paymentArr.includes(req.body.payment)) {
      obj.employment = Joi.required();
      if (!req.body.employment) {
        return res
          .status(400)
          .send({ status: 400, message: "employment is required" });
      }
    }
    //  else {
    //   return res.status(400).send({
    //     status: 400,
    //     message: "A valid string is Yes or No for US id",
    //   });
    // }
    obj.test_type = Joi.object()
      .keys({
        name: Joi.string().required(),
        type: Joi.string().required(),
      })
      .required();
    const schema = Joi.object(obj);
    await schema.validateAsync(req.body);
    if (req.body.payment === "Insurance") {
      if (!req.files.insurance_image) {
        return res
          .status(400)
          .send({ status: 400, message: "Insurance image required" });
      }
    }
    if (req?.files?.insurance_image) {
      req.body.insurance_image = await getDropBoxLink(
        "/insurance images/" +
          generateRandomNumber(111, 999) +
          "-" +
          req.files.insurance_image[0].filename,
        req.files.insurance_image[0].path,
        false
      );
    }
    // After validation
    const { test_type, first_name, last_name } = req.body;
    let name = "";
    if (first_name) {
      name = first_name;
    }
    if (last_name) {
      name = last_name;
    }
    const check_test_type_exist = await findOne("location", {
      _id: employee_location._id,
      test: {
        $elemMatch: {
          name: test_type.name,
          types: { $in: [test_type.type] },
        },
      },
    });
    console.log(check_test_type_exist);
    if (!check_test_type_exist) {
      return res
        .status(404)
        .send({ status: 404, message: "Test Type not exist!" });
    }
    // const check_tested_user_exist = await findOne("user", {
    //   username: tested_by,
    // });
    // if (!check_tested_user_exist) {
    //   return res
    //     .status(404)
    //     .send({ status: 404, message: "Tested User not exist!" });
    // }
    // Signature required
    if (!req.body.patient_signature) {
      return res.status(400).send({
        status: 400,
        message: "Patient Signature is required (patient_signature)",
      });
    }
    if (!base64regex.test(req.body.patient_signature)) {
      return res.status(400).send({
        status: 400,
        message: "Patient Signature should be in base64",
      });
    }
    // Signature
    // patient_signature sending to Dropbox
    const patientSignatureLink = await getDropBoxLink(
      "/patient signature/" +
        `patient-signature-${generateRandomNumber(11111, 99999).toFixed(
          0
        )}.png`,
      _base64ToArrayBuffer(
        req.body.patient_signature.replace(/^data:image\/[a-z]+;base64,/, "")
      ),
      true
    );
    // generating PDF of signature HTML
    const signaturePdfPath = await generatePdf(
      signatureHtml(req.body.patient_signature, req.body),
      `./public/signature pdf/signature${generateRandomNumber(
        11111,
        99999
      ).toFixed(0)}.pdf`
    );
    // getting signaturepdf URL from Dropbox
    const signaturePdfLink = await getDropBoxLink(
      "/signature pdf/" +
        `signature-${generateRandomNumber(11111, 99999).toFixed(0)}.pdf`,
      signaturePdfPath.filename,
      false
    );

    // Consent
    // console.log(getSignatureImage);  // Buffer
    const consentPdfPath = await generatePdf(
      consentHtml(req.body.patient_signature, req.body),
      `./public/consent pdf/consent${generateRandomNumber(11111, 99999).toFixed(
        0
      )}.pdf`
    );
    const consentPdfLink = await getDropBoxLink(
      "/consent pdf/" +
        `consent-${generateRandomNumber(11111, 99999).toFixed(0)}.pdf`,
      consentPdfPath.filename,
      false
    );

    // Qrcode stuff
    // get pid auto generated
    const numberDoc = await findOneAndUpdate(
      "NumberGeneratorModel",
      { name: "pid" },
      { $inc: { value: 1 } },
      { new: true }
    );
    const value = numberDoc.value;
    const sequenceNumber = (value + "").padStart(4, "0");
    const pid = "pid-" + sequenceNumber;
    const orderNoDoc = await findOneAndUpdate(
      "NumberGeneratorModel",
      { name: "pid" },
      { $inc: { value: 1 } },
      { new: true }
    );
    const orderNoValue = orderNoDoc.value;
    const orederNoSequenceNumber = (orderNoValue + "").padStart(4, "0");
    const order_no = dateFormat() + orederNoSequenceNumber;
    await helperFunctionForQrCode(pid);
    const qrcodeLink = await getDropBoxLink(
      "/qrcode/" + pid + ".png",
      `./public/qrcodes/${pid}.png`,
      false
    );
    req.body.location_id = user.employee_location;
    req.body.created_by = req.userId;
    req.body.patient_signature = patientSignatureLink;
    req.body.signature = signaturePdfLink;
    req.body.consent_link = consentPdfLink;
    req.body.pid = pid;
    req.body.order_no = order_no;
    req.body.pid_link = qrcodeLink;
    req.body.test_type = test_type;
    // req.body.tested_by = check_tested_user_exist._id;
    const patient_created = await insertNewDocument("patient", req.body);

    if (test_type.name === "Rapid Antigen") {
      send_email(
        res,
        "AllTestsApplicationEmail",
        {
          username: name,
          test_type: test_type,
          time: "15 to 20 minutes",
          qrcodelink: req.body.pid_link,
          // telephone: user.telephone, // edit the template and pass prop manager_logo , telephone , email , location_Description
        },
        "Health Titan Pro",
        "Patient Account Created",
        req.body.email,
        [
          {
            filename: "qrcode.png",
            path: `./public/qrcodes/${pid}.png`, // Path of barcode img
          },
          {
            filename: "signature.pdf",
            path: signaturePdfPath.filename, // Path of signature file
          },
          {
            filename: "consent.pdf",
            path: consentPdfPath.filename, // Path of signature file
          },
        ]
      );
    } else {
      send_email(
        res,
        "AllTestsApplicationEmail",
        {
          username: name,
          test_type: test_type,
          time: "24 hours or less",
          qrcodelink: req.body.pid_link,
        },
        "Health Titan Pro",
        "Patient Account Created",
        req.body.email,
        [
          {
            filename: "qrcode.png",
            path: `./public/qrcodes/${pid}.png`, // Path of barcode img
          },
          {
            filename: "signature.pdf",
            path: signaturePdfPath.filename, // Path of signature file
          },
          {
            filename: "consent.pdf",
            path: consentPdfPath.filename, // Path of signature file
          },
        ]
      );
      // fs.unlinkSync(`./public/qrcodes/${pid}.png`);
    }
    return res.status(200).send({ status: 200, patient_created });
  } catch (e) {
    // req?.files.map((file) => {
    //   fs.unlinkSync(file.path);
    // });
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = addPatient;
