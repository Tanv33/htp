const { searchDocuments } = require("../../../helpers");

const getEmployees = async (req, res) => {
  const getAllEmployees = await searchDocuments("userType", {
    type: { $nin: ["Asins", "Manager", "Vendor", "Production Manager"] },
  });
  res.status(200).send({ status: 200, employees: getAllEmployees });
};
module.exports = getEmployees;
