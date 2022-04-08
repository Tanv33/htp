const { find } = require("../../../helpers");

const getUploadHistory = async (req, res) => {
  try {
    const uploadHistory = await find("uploadHistory", {
      created_by: req.userId,
    });
    return res.status(200).send({ status: 200, uploadHistory });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, mesaage: e.message });
  }
};
module.exports = getUploadHistory;
