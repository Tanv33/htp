const { getPopulatedData, findOne, find } = require("../../../helpers");

const query = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      date_of_birth,
      address,
      city,
      state,
      zip_code,
      email,
      telephone,
      status,
      location_name,
    } = req.query;
    const manager = await findOne("user", { _id: req.userId });
    let employees;
    if (first_name) {
      employees = await getPopulatedData(
        "user",
        {
          mid: manager.mid,
          _id: { $ne: req.userId },
          first_name: { $regex: first_name, $options: "i" },
        },
        "type employee_location"
      );
      return res.status(200).send({ status: 200, employees });
    }
    if (last_name) {
      employees = await getPopulatedData(
        "user",
        {
          mid: manager.mid,
          _id: { $ne: req.userId },
          last_name: { $regex: last_name, $options: "i" },
        },
        "type employee_location"
      );
      return res.status(200).send({ status: 200, employees });
    }
    if (date_of_birth) {
      employees = await getPopulatedData(
        "user",
        {
          mid: manager.mid,
          _id: { $ne: req.userId },
          date_of_birth: date_of_birth,
        },
        "type employee_location"
      );
      return res.status(200).send({ status: 200, employees });
    }
    if (address) {
      employees = await getPopulatedData(
        "user",
        {
          mid: manager.mid,
          _id: { $ne: req.userId },
          address: { $regex: address, $options: "i" },
        },
        "type employee_location"
      );
      return res.status(200).send({ status: 200, employees });
    }
    if (city) {
      employees = await getPopulatedData(
        "user",
        {
          mid: manager.mid,
          _id: { $ne: req.userId },
          city: { $regex: city, $options: "i" },
        },
        "type employee_location"
      );
      return res.status(200).send({ status: 200, employees });
    }
    if (state) {
      employees = await getPopulatedData(
        "user",
        {
          mid: manager.mid,
          _id: { $ne: req.userId },
          state: { $regex: state, $options: "i" },
        },
        "type employee_location"
      );
      return res.status(200).send({ status: 200, employees });
    }
    if (zip_code) {
      employees = await getPopulatedData(
        "user",
        {
          mid: manager.mid,
          _id: { $ne: req.userId },
          zip_code: { $regex: zip_code, $options: "i" },
        },
        "type employee_location"
      );
      return res.status(200).send({ status: 200, employees });
    }
    if (email) {
      employees = await getPopulatedData(
        "user",
        {
          mid: manager.mid,
          _id: { $ne: req.userId },
          email: { $regex: email, $options: "i" },
        },
        "type employee_location"
      );
      return res.status(200).send({ status: 200, employees });
    }
    if (telephone) {
      employees = await getPopulatedData(
        "user",
        {
          mid: manager.mid,
          _id: { $ne: req.userId },
          telephone: { $regex: telephone, $options: "i" },
        },
        "type employee_location"
      );
      return res.status(200).send({ status: 200, employees });
    }
    let statusArray = ["Active", "Disabled", "Pending"];
    if (statusArray.includes(status)) {
      employees = await getPopulatedData(
        "user",
        {
          mid: manager.mid,
          _id: { $ne: req.userId },
          status: { $regex: status, $options: "i" },
        },
        "type employee_location"
      );
      return res.status(200).send({ status: 200, employees });
    }
    if (location_name) {
      employees = await find("location", {
        _id: { $in: manager.manager_location },
        location_name: { $regex: location_name, $options: "i" },
      });
      return res.status(200).send({ status: 200, employees });
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
