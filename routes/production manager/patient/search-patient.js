const Joi = require("joi");
const { findOne, getPopulatedData, find } = require("../../../helpers");
const schema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  pid: Joi.string(),
  order_no: Joi.number(),
  email: Joi.string().email(),
  telephone: Joi.string(),
});
const searchPatient = async (req, res) => {
  try {
    await schema.validateAsync(req.query);
    const { first_name, last_name, pid, order_no, email, telephone } =
      req.query;
    let queryArr = [];
    const production_manager = await findOne("user", {
      _id: req.userId,
    });
    const { production_manager_location } = production_manager;
    if (first_name) {
      queryArr = await getPopulatedData(
        "patient",
        {
          location_id: { $in: production_manager_location },
          first_name: { $regex: first_name, $options: "i" },
          is_tested: "Yes",
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, queryArr });
    }
    if (last_name) {
      queryArr = await getPopulatedData(
        "patient",
        {
          location_id: { $in: production_manager_location },
          last_name: { $regex: last_name, $options: "i" },
          is_tested: "Yes",
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, queryArr });
    }
    if (pid) {
      queryArr = await getPopulatedData(
        "patient",
        {
          location_id: { $in: production_manager_location },
          pid,
          is_tested: "Yes",
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, queryArr });
    }
    if (order_no) {
      queryArr = await getPopulatedData(
        "patient",
        {
          location_id: { $in: production_manager_location },
          order_no,
          is_tested: "Yes",
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, queryArr });
    }
    if (email) {
      queryArr = await getPopulatedData(
        "patient",
        {
          location_id: { $in: production_manager_location },
          email,
          is_tested: "Yes",
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, queryArr });
    }
    if (telephone) {
      queryArr = await getPopulatedData(
        "patient",
        {
          location_id: { $in: production_manager_location },
          telephone,
          is_tested: "Yes",
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, queryArr });
    }
    return res
      .status(400)
      .send({ status: 400, message: "Enter a correct query key and value" });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = searchPatient;
