const { deleteDocument, findOneAndUpdate } = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  _id: Joi.string().required(),
});

const deleteLocation = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const { _id } = req.body;
    await findOneAndUpdate(
      "user",
      { _id: req.userId },
      {
        $pullAll: {
          production_manager_location: [_id],
        },
      }
    );
    await deleteDocument("location", { _id });
    return res
      .status(200)
      .send({ status: 200, message: "Location deleted successfully" });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = deleteLocation;
