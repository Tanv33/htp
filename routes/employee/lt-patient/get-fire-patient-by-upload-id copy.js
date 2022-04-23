const { find } = require("../../../helpers");

const getFirePatientByUploadId = async (req, res) => {
  try {
    const csv_id = req.params.id;
    const duplicatePatients = await find("duplicateCsvLts", {
      csv_id,
      created_by: req.userId,
    });
    return res.status(200).send({ status: 200, duplicatePatients });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, mesaage: e.message });
  }
};
module.exports = getFirePatientByUploadId;
