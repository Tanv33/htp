const Joi = require("joi");
const { find, findOne } = require("../../helpers");

const schema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  pid: Joi.string(),
  order_no: Joi.number(),
});

const searchPatient = async (req, res) => {
  try {
    await schema.validateAsync(req.query);
    const { first_name, last_name, pid, order_no } = req.query;
    const getUser = await findOne("user", { _id: req.userId });
    if (first_name) {
      const patients = await find("patient", {
        first_name: {
          $regex: new RegExp("^" + first_name + "$", "i"),
        },
        location_id: { $in: getUser.vendor_locations },
        is_tested: "Yes",
      });
      return res.status(200).send({ status: 200, patients });
    }
    if (last_name) {
      const patients = await find("patient", {
        last_name: {
          $regex: new RegExp("^" + last_name + "$", "i"),
        },
        location_id: { $in: getUser.vendor_locations },
        is_tested: "Yes",
      });
      return res.status(200).send({ status: 200, patients });
    }
    if (pid) {
      const patients = await find("patient", {
        pid: {
          $regex: new RegExp("^" + pid + "$", "i"),
        },
        location_id: { $in: getUser.vendor_locations },
        is_tested: "Yes",
      });
      return res.status(200).send({ status: 200, patients });
    }
    if (order_no) {
      const patients = await find("patient", {
        order_no,
        location_id: { $in: getUser.vendor_locations },
        is_tested: "Yes",
      });
      return res.status(200).send({ status: 200, patients });
    }
    return res
      .status(400)
      .send({ status: 400, message: "Please input correct credendtials" });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = searchPatient;
