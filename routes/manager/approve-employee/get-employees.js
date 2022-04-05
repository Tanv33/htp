const { findOne, getPopulatedData } = require("../../../helpers");

const getEmployees = async (req, res) => {
  try {
    const manager = await findOne("user", { _id: req.userId });
    const vendorType = await findOne("userType", { type: "Vendor" });
    const ProductionManagerType = await findOne("userType", {
      type: "Production Manager",
    });
    const employeeArray = await getPopulatedData(
      "user",
      {
        mid: manager.mid,
        _id: { $ne: req.userId },
        type: { $nin: [vendorType._id, ProductionManagerType._id] },
      },
      "type employee_location"
    );
    return res.status(200).send({ status: 200, employeeArray });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getEmployees;
