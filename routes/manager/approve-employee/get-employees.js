const Joi = require("joi");
const {
  findOne,
  getCount,
  getPopulatedDataWithLimit,
} = require("../../../helpers");

const newSchema = Joi.object({
  page: Joi.string().required(),
});

const getEmployees = async (req, res) => {
  try {
    await newSchema.validateAsync(req.query);
    const { page } = req.query;
    const manager = await findOne("user", { _id: req.userId });
    const vendorType = await findOne("userType", { type: "Vendor" });
    const ProductionManagerType = await findOne("userType", {
      type: "Production Manager",
    });
    const employeeArray = await getPopulatedDataWithLimit(
      "user",
      {
        mid: manager.mid,
        _id: { $ne: req.userId },
        type: { $nin: [vendorType._id, ProductionManagerType._id] },
      },
      "type employee_location",
      "",
      { _id: -1 },
      page,
      6
    );
    const lengrth = await getCount("user", {
      mid: manager.mid,
      _id: { $ne: req.userId },
      type: { $nin: [vendorType._id, ProductionManagerType._id] },
    });
    return res.status(200).send({ status: 200, lengrth, employeeArray });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getEmployees;
