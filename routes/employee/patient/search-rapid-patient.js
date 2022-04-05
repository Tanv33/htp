const Joi = require("joi");
const { getPopulatedData } = require("../../../helpers");

const schema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  email: Joi.string().email(),
  telephone: Joi.string(),
  pid: Joi.string(),
  order_no: Joi.number(),
  bar_code: Joi.string(),
});
const searchRapidPatient = async (req, res) => {
  try {
    await schema.validateAsync(req.query);
    const { first_name, last_name, email, telephone, pid, order_no, bar_code } =
      req.query;

    if (first_name) {
      const searchPatient = await getPopulatedData(
        "patient",
        {
          first_name: {
            $regex: new RegExp("^" + first_name + "$", "i"),
          },
          created_by: req.userId,
          is_tested: "Yes",
          "test_type.type": "Rapid",
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, searchPatient });
    }
    if (last_name) {
      const searchPatient = await getPopulatedData(
        "patient",
        {
          last_name: {
            $regex: new RegExp("^" + last_name + "$", "i"),
          },
          created_by: req.userId,
          is_tested: "Yes",
          "test_type.type": "Rapid",
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, searchPatient });
    }
    if (email) {
      const searchPatient = await getPopulatedData(
        "patient",
        {
          email: {
            $regex: new RegExp("^" + email + "$", "i"),
          },
          created_by: req.userId,
          is_tested: "Yes",
          "test_type.type": "Rapid",
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, searchPatient });
    }
    if (telephone) {
      const searchPatient = await getPopulatedData(
        "patient",
        {
          telephone: { $regex: telephone, $options: "i" },
          created_by: req.userId,
          is_tested: "Yes",
          "test_type.type": "Rapid",
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, searchPatient });
    }
    if (pid) {
      const searchPatient = await getPopulatedData(
        "patient",
        {
          pid: {
            $regex: new RegExp("^" + pid + "$", "i"),
          },
          created_by: req.userId,
          is_tested: "Yes",
          "test_type.type": "Rapid",
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, searchPatient });
    }
    if (order_no) {
      const searchPatient = await getPopulatedData(
        "patient",
        {
          order_no,
          created_by: req.userId,
          is_tested: "Yes",
          "test_type.type": "Rapid",
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, searchPatient });
    }
    if (bar_code) {
      const searchPatient = await getPopulatedData(
        "patient",
        {
          bar_code,
          created_by: req.userId,
          is_tested: "Yes",
          "test_type.type": "Rapid",
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, searchPatient });
    }

    return res
      .status(400)
      .send({ status: 400, message: "Please Input correct credentials" });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = searchRapidPatient;
