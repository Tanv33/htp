const Joi = require("joi");
const { findOne } = require("../../helpers");

const getLocation = async (req, res) => {
  try {
    const { location_id } = req.query;
    if (!location_id) {
      return res
        .status(404)
        .send({ status: 404, message: "Location id required" });
    }
    const location = await findOne("location", { _id: location_id });
    if (!location) {
      return res
        .status(404)
        .send({ status: 404, message: "No Location Found" });
    }
    return res.status(200).send({ status: 200, location });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = getLocation;
