const { find } = require("../../../helpers");

const getAllDuplicatePatient = async (req, res) => {
  try {
    const duplicatePatients = await find("duplicateCsvLts", {
      created_by: req.userId,
    });
    return res.status(200).send({ status: 200, duplicatePatients });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, mesaage: e.message });
  }
};
module.exports = getAllDuplicatePatient;
