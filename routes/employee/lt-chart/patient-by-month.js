const { getAggregate, findOne } = require("../../../helpers");

const patientByMonthsChart = async (req, res) => {
  try {
    const months = [
      "",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const user = await findOne("user", { _id: req.userId });
    const { employee_location } = user;

    const patientArr = await getAggregate("patient", [
      {
        $match: { location_id: employee_location },
      },
      {
        $group: {
          _id: {
            monthNumber: { $month: "$createdAt" },
            // year: { $year: "$createdAt" },
            year: { $year: new Date() },
          },
          negative: {
            $sum: {
              $cond: [{ $eq: ["$patient_result", "Negative"] }, 1, 0],
            },
          },
          positive: {
            $sum: {
              $cond: [{ $eq: ["$patient_result", "Positive"] }, 1, 0],
            },
          },
          inconclusive: {
            $sum: {
              $cond: [{ $eq: ["$patient_result", "Inconclusive"] }, 1, 0],
            },
          },
          pending: {
            $sum: {
              $cond: [{ $eq: ["$patient_result", "Pending"] }, 1, 0],
            },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    for (let i = 0; i < patientArr.length; i++) {
      patientArr[i].month = months[patientArr[i]._id.monthNumber];
    }
    res.status(200).send({ status: 200, patientArr });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = patientByMonthsChart;
