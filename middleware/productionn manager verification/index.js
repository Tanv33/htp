const { getPopulatedData } = require("../../helpers");

const prodcutionManagerVerification = async (req, res, next) => {
  try {
    const is_production_manager_user = await getPopulatedData(
      "user",
      { _id: req.userId },
      "type",
      "type"
    );
    let productionManageArr = ["Production Manager", "Asins"];
    if (
      !productionManageArr.includes(is_production_manager_user[0].type.type)
    ) {
      return res.status(400).send({
        status: 400,
        message: "Production Manager can only Access",
      });
    }
    next();
  } catch (e) {
    console.log("Production Manager token verification Error", e.message);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = {
  prodcutionManagerVerification: prodcutionManagerVerification,
};
