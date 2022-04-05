const { updateDocument, findOne } = require("../../../helpers");
const { send_email } = require("../../../lib");

const approveManager = async (req, res) => {
  try {
    const getSingleManager = await findOne("user", { _id: req.params.id });
    let newStatus = "";
    if (getSingleManager.status === "Active") {
      newStatus = "Disabled";
    } else {
      newStatus = "Active";
    }
    await updateDocument("user", { _id: req.params.id }, { status: newStatus });
    const user = await findOne("user", { _id: req.params.id });
    if (user.status === "Active") {
      send_email(
        res,
        "employeeApprovedTemp",
        {
          username: user.full_name,
          manager_logo: user.manager_logo,
          email: user.email,
          telephone: user.telephone,
          lab_address: user.lab_address,
          email: user.email,
        },
        "Health Titan Pro",
        "Account Approved Successfully",
        user.email
      );
    } else {
      send_email(
        res,
        "userDisabled",
        {
          username: user.full_name,
          manager_logo: user.manager_logo,
          email: user.email,
          telephone: user.telephone,
          lab_address: user.lab_address,
          email: user.email,
        },

        "Health Titan Pro",
        "Account Disabled",
        user.email
      );
    }
    return res.status(200).send({ status: 200, manager: user });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = approveManager;
