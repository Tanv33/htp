const { getPopulatedData } = require("../../helpers");

const managerVerification = async (req, res, next) => {
  try {
    const is_manager_user = await getPopulatedData(
      "user",
      { _id: req.userId },
      "type",
      "type"
    );
    let manageArr = ["Manager", "Asins"];
    if (!manageArr.includes(is_manager_user[0].type.type)) {
      return res.status(400).send({
        status: 400,
        message: "Manager can Only Access",
      });
    }
    next();
  } catch (e) {
    console.log("Manager token verification Error", e.message);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = { managerVerification: managerVerification };
