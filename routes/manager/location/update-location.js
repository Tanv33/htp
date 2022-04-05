const { updateDocument, findOne } = require("../../../helpers");
const Joi = require("joi");

let testItems = Joi.object().keys({
  name: Joi.string(),
  types: Joi.array(),
});

let patientItems = Joi.object().keys({
  field: Joi.string(),
  required: Joi.string(),
});

const schema = Joi.object({
  location_name: Joi.string(),
  email: Joi.string().email(),
  zip_code: Joi.string(),
  consent: Joi.string(),
  address: Joi.string(),
  city: Joi.string(),
  business_or_individual: Joi.string(),
  send_copy_to_email: Joi.boolean(),
  location_logo: Joi.string(),
  test: Joi.array().items(testItems),
  patient_required_fields: Joi.array().items(patientItems),
});

const updateLocation = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const checkLocaitonExist = await findOne("location", {
      _id: req.params.id,
    });
    if (!checkLocaitonExist) {
      return res
        .status(400)
        .send({ status: 400, message: "No location found with your given id" });
    }
    console.log(checkLocaitonExist);
    const updatedLocation = await updateDocument(
      "location",
      { _id: req.params.id },
      req.body
    );
    return res.status(200).send({
      status: 200,
      message: "Location Updated Successfully",
      updatedLocation,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = updateLocation;

// const { updateDocument } = require("../../../helpers");
// const Joi = require("joi");

// let testItems = Joi.object().keys({
//   name: Joi.string(),
//   types: Joi.array(),
// });

// let patientItems = Joi.object().keys({
//   field: Joi.string(),
//   required: Joi.string(),
// });

// const managerSchema = Joi.object({
//   location_name: Joi.string(),
//   email: Joi.string().email(),
//   zip_code: Joi.string(),
//   consent: Joi.string(),
//   address: Joi.string(),
//   city: Joi.string(),
//   business_or_individual: Joi.string(),
//   send_copy_to_email: Joi.boolean(),
//   location_logo: Joi.string(),
//   test: Joi.array().items(testItems),
//   patient_required_fields: Joi.array().items(patientItems),
// });

// const adminSchema = Joi.object({
//   location_name: Joi.string(),
//   email: Joi.string().email(),
//   zip_code: Joi.string(),
//   consent: Joi.string(),
//   address: Joi.string(),
//   city: Joi.string(),
//   business_or_individual: Joi.string(),
//   send_copy_to_email: Joi.boolean(),
//   location_logo: Joi.string(),
//   test: Joi.array().items(testItems),
//   patient_required_fields: Joi.array().items(patientItems),
//   manager_id: Joi.string().required(),
// });

// const updateLocation = async (req, res) => {
//   try {
//     const { manager_id } = req.body;
//     const checkUser = await findOneAndPopulate(
//       "user",
//       {
//         _id: req.userId,
//       },
//       "type"
//     );
//     if (checkUser?.type?.type === "Manager") {
//       await managerSchema.validateAsync(req.body);
//     }
//     if (checkUser?.type?.type === "Asins") {
//       await adminSchema.validateAsync(req.body);
//       const findManager = await findOne("user", {
//         _id: manager_id,
//       });
//       console.log(findManager);
//       if (!findManager) {
//         return res.status(404).send({
//           status: 404,
//           message: "NO manager found with your given manager id",
//         });
//       }
//     }

//     const updatedLocation = await updateDocument(
//       "location",
//       { _id: req.params.id },
//       req.body
//     );
//     return res.status(200).send({
//       status: 200,
//       message: "Location Updated Successfully",
//       updatedLocation,
//     });
//   } catch (e) {
//     console.log(e);
//     return res.status(400).send({ status: 400, message: e.message });
//   }
// };

// module.exports = updateLocation;
