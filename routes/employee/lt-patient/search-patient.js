const Joi = require("joi");
const { findOne, getPopulatedData } = require("../../../helpers");

const schema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  email: Joi.string().email(),
  telephone: Joi.string(),
  date_of_birth: Joi.date(),
  pid: Joi.string(),
  order_no: Joi.number(),
  tested_date: Joi.date(),
  bar_code: Joi.string(),
  patient_result: Joi.string(),
  patient_result_date: Joi.date(),
});
const searchPatient = async (req, res) => {
  try {
    await schema.validateAsync(req.query);
    const {
      pid,
      order_no,
      bar_code,
      first_name,
      last_name,
      email,
      telephone,
      tested_date,
      date_of_birth,
      patient_result,
      patient_result_date,
    } = req.query;
    const user = await findOne("user", { _id: req.userId });
    const { employee_location } = user;

    if (first_name) {
      const patients = await getPopulatedData(
        "patient",
        {
          first_name: { $regex: first_name, $options: "i" },
          location_id: employee_location,
          is_tested: "Yes",
          "test_type.type": { $ne: "Rapid" },
        },
        "location_id created_by",
        "location_name full_name lab_name lab_address"
      );
      return res.status(200).send({ status: 200, message: patients });
    }
    if (last_name) {
      const patients = await getPopulatedData(
        "patient",
        {
          last_name: { $regex: last_name, $options: "i" },
          location_id: employee_location,
          is_tested: "Yes",
          "test_type.type": { $ne: "Rapid" },
        },
        "location_id created_by",
        "location_name full_name lab_name lab_address"
      );
      return res.status(200).send({ status: 200, message: patients });
    }
    if (email) {
      const patients = await getPopulatedData(
        "patient",
        {
          email: {
            $regex: new RegExp("^" + email + "$", "i"),
          },
          location_id: employee_location,
          is_tested: "Yes",
          "test_type.type": { $ne: "Rapid" },
        },
        "location_id created_by",
        "location_name full_name lab_name lab_address"
      );
      return res.status(200).send({ status: 200, message: patients });
    }
    if (telephone) {
      const patients = await getPopulatedData(
        "patient",
        {
          telephone: { $regex: telephone, $options: "i" },
          location_id: employee_location,
          is_tested: "Yes",
          "test_type.type": { $ne: "Rapid" },
        },
        "location_id created_by",
        "location_name full_name lab_name lab_address"
      );
      return res.status(200).send({ status: 200, message: patients });
    }
    if (date_of_birth) {
      const patients = await getPopulatedData(
        "patient",
        {
          date_of_birth,
          location_id: employee_location,
          is_tested: "Yes",
          "test_type.type": { $ne: "Rapid" },
        },
        "location_id created_by",
        "location_name full_name lab_name lab_address"
      );
      return res.status(200).send({ status: 200, message: patients });
    }
    if (pid) {
      const patients = await getPopulatedData(
        "patient",
        {
          pid: {
            $regex: new RegExp("^" + pid + "$", "i"),
          },
          location_id: employee_location,
          is_tested: "Yes",
          "test_type.type": { $ne: "Rapid" },
        },
        "location_id created_by",
        "location_name full_name lab_name lab_address"
      );
      return res.status(200).send({ status: 200, message: patients });
    }
    if (order_no) {
      const patients = await getPopulatedData(
        "patient",
        {
          order_no,
          location_id: employee_location,
          is_tested: "Yes",
          "test_type.type": { $ne: "Rapid" },
        },
        "location_id created_by",
        "location_name full_name lab_name lab_address"
      );
      return res.status(200).send({ status: 200, message: patients });
    }
    if (tested_date) {
      const patients = await getPopulatedData(
        "patient",
        {
          tested_date,
          location_id: employee_location,
          is_tested: "Yes",
          "test_type.type": { $ne: "Rapid" },
        },
        "location_id created_by",
        "location_name full_name lab_name lab_address"
      );
      return res.status(200).send({ status: 200, message: patients });
    }
    if (bar_code) {
      const patients = await getPopulatedData(
        "patient",
        {
          bar_code: {
            $regex: new RegExp("^" + bar_code + "$", "i"),
          },
          location_id: employee_location,
          is_tested: "Yes",
          "test_type.type": { $ne: "Rapid" },
        },
        "location_id created_by",
        "location_name full_name lab_name lab_address"
      );
      return res.status(200).send({ status: 200, message: patients });
    }
    if (patient_result) {
      const patients = await getPopulatedData(
        "patient",
        {
          patient_result: {
            $regex: new RegExp("^" + patient_result + "$", "i"),
          },
          location_id: employee_location,
          is_tested: "Yes",
          "test_type.type": { $ne: "Rapid" },
        },
        "location_id created_by",
        "location_name first_name lab_name lab_address"
      );
      return res.status(200).send({ status: 200, message: patients });
    }
    if (patient_result_date) {
      const patients = await getPopulatedData(
        "patient",
        {
          patient_result_date,
          location_id: employee_location,
          is_tested: "Yes",
          "test_type.type": { $ne: "Rapid" },
        },
        "location_id created_by",
        "location_name first_name lab_name lab_address"
      );
      return res.status(200).send({ status: 200, message: patients });
    }
    return res
      .status(400)
      .send({ status: 400, message: "Please input correct credentials" });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = searchPatient;
