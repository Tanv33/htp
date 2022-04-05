const Joi = require("joi");
const { findOne } = require("../../../helpers");
const schema = Joi.object({
  location_id: Joi.string().required(),
});
const getRequiredFields = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const { location_id } = req.body;
    const checkLocation = await findOne("user", {
      _id: req.userId,
      production_manager_location: { $in: [location_id] },
    });
    if (!checkLocation) {
      return res
        .status(400)
        .send({
          status: 400,
          message:
            "No Location Found With Your Id | You are Accessing other location",
        });
    }
    const location = await findOne("location", {
      _id: location_id,
    });
    return res.status(200).send({
      status: 200,
      location,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getRequiredFields;
