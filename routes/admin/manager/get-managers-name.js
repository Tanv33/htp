const { findOne, findAndSelect } = require("../../../helpers");

const getManagersName = async (req, res) => {
  try {
    const manager = await findOne("userType", { type: "Manager" });
    const { _id } = manager;
    const managers = await findAndSelect(
      "user",
      { type: _id },
      "full_name mid"
    );
    return res
      .status(200)
      .send({ status: 200, length: managers.length, managers });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getManagersName;
