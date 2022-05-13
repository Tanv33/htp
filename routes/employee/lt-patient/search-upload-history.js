const Joi = require("joi");
const { find } = require("../../../helpers");
const searchSchema = Joi.object({
  total_result: Joi.string(),
  uploaded_result: Joi.string(),
  duplicate_result: Joi.string(),
  uploaded_date: Joi.date(),
});
const searchploadHistory = async (req, res) => {
  try {
    await searchSchema.validateAsync(req.query);
    const { total_result, uploaded_result, duplicate_result, uploaded_date } =
      req.query;
    console.log(uploaded_date);
    if (total_result) {
      const uploadHistory = await find("uploadHistory", {
        created_by: req.userId,
        total_result,
      });
      return res.status(200).send({ status: 200, uploadHistory });
    }
    if (uploaded_result) {
      const uploadHistory = await find("uploadHistory", {
        created_by: req.userId,
        uploaded_result,
      });
      return res.status(200).send({ status: 200, uploadHistory });
    }
    if (duplicate_result) {
      const uploadHistory = await find("uploadHistory", {
        created_by: req.userId,
        duplicate_result,
      });
      return res.status(200).send({ status: 200, uploadHistory });
    }
    if (uploaded_date) {
      const uploadHistory = await find("uploadHistory", {
        created_by: req.userId,
        uploaded_date: {
          $gte: new Date(uploaded_date),
        },
      });
      return res.status(200).send({ status: 200, uploadHistory });
    }
    return res
      .status(400)
      .send({ status: 400, message: "Invalid parameters provided" });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, mesaage: e.message });
  }
};
module.exports = searchploadHistory;
