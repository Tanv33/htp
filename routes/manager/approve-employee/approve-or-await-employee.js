const { updateDocument, findOne } = require("../../../helpers");
const { send_email } = require("../../../lib");

const approveEmployee = async (req, res) => {
  try {
    let newStatus = "";
    const manager = await findOne("user", { _id: req.userId });
    const employee = await findOne("user", { _id: req.params.id });
    if (employee.status === "Active") {
      newStatus = "Disabled";
    } else {
      newStatus = "Active";
    }
    await updateDocument("user", { _id: req.params.id }, { status: newStatus });
    const employeeUpdate = await findOne("user", { _id: req.params.id });
    if (employeeUpdate.status === "Active") {
      send_email(
        res,
        "employeeApprovedTemp",
        {
          username: employee.first_name,
          manager_logo: manager.manager_logo,
          email: manager.email,
          telephone: manager.telephone,
          lab_address: manager.lab_address,
        },
        "Health Titan Pro",
        "Account Approved Successfully",
        employee.email
      );
    }else{
      send_email(
        res,
        "userDisabled",
        {
          username: employee.first_name,
          manager_logo: manager.manager_logo,
          email: manager.email,
          telephone: manager.telephone,
          lab_address: manager.lab_address,
        },
        "Health Titan Pro",
        "Account Disabled",
        employee.email
      );

    }
    return res.status(200).send({ status: 200, employee: employeeUpdate });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = approveEmployee;
