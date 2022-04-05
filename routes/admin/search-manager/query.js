const { getPopulatedData, findOne, find } = require("../../../helpers");

const query = async (req, res) => {
  try {
    const { full_name, email, mid, telephone, status, lab_name, lab_address } =
      req.query;
    const managerTypeObject = await findOne("userType", { type: "Manager" });
    const { _id } = managerTypeObject;
    let managers;
    if (full_name) {
      managers = await getPopulatedData(
        "user",
        {
          type: _id,
          full_name: { $regex: full_name, $options: "i" },
        },
        "type manager_location"
      );
      return res.status(200).send({ status: 200, managers });
    }
    if (email) {
      managers = await getPopulatedData(
        "user",
        {
          type: _id,
          email: { $regex: email, $options: "i" },
        },
        "type manager_location"
      );
      return res.status(200).send({ status: 200, managers });
    }
    if (mid) {
      managers = await getPopulatedData(
        "user",
        {
          type: _id,
          mid: { $regex: mid, $options: "i" },
        },
        "type manager_location"
      );
      return res.status(200).send({ status: 200, managers });
    }
    if (telephone) {
      managers = await getPopulatedData(
        "user",
        {
          type: _id,
          telephone: { $regex: telephone, $options: "i" },
        },
        "type manager_location"
      );
      return res.status(200).send({ status: 200, managers });
    }
    if (lab_name) {
      managers = await getPopulatedData(
        "user",
        {
          type: _id,
          lab_name: { $regex: lab_name, $options: "i" },
        },
        "type manager_location"
      );
      return res.status(200).send({ status: 200, managers });
    }
    if (lab_address) {
      managers = await getPopulatedData(
        "user",
        {
          type: _id,
          lab_address: { $regex: lab_address, $options: "i" },
        },
        "type manager_location"
      );
      return res.status(200).send({ status: 200, managers });
    }
    let statusArray = ["Active", "Disabled", "Pending"];
    if (statusArray.includes(status)) {
      managers = await getPopulatedData(
        "user",
        {
          type: _id,
          status: { $regex: status, $options: "i" },
        },
        "type manager_location"
      );
      return res.status(200).send({ status: 200, managers });
    } else {
      return res
        .status(400)
        .send({ status: 400, message: "Wrong key or value search" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = query;
