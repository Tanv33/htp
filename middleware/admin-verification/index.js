const { getPopulatedData } = require("../../helpers");

const adminVerification = async (req, res, next) => {
  try {
    const is_admin_user = await getPopulatedData(
      "user",
      { _id: req.userId },
      "type",
      "type"
    );
    if (is_admin_user[0].type.type !== "Asins") {
      return res.status(400).send({
        status: 400,
        message: "Admin can only Approve Manager",
      });
    }
    next();
  } catch (e) {
    console.log("Admin token verification Error", e.message);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = { adminVerification: adminVerification };
