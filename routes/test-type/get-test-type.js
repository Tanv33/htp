const { find } = require("../../helpers");

const getTestType = async (req, res) => {
  try {
    let response = await find("testType", {});
    return res.status(200).send({ status: 200, response });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getTestType;
