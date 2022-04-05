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
    const vendor = await findOne("user", { _id: req.userId });
    const { vendor_locations } = vendor;
    const patientArr = await getAggregate("patient", [
      {
        $match: { location_id: { $in: vendor_locations } },
      },
      {
        $group: {
          _id: {
            monthNumber: { $month: "$createdAt" },
            // year: { $year: "$createdAt" },
            year: { $year: new Date() },
          },
          totalPatient: {
            $sum: 1,
          },
          testedPatient: {
            $sum: {
              $cond: [{ $eq: ["$is_tested", "Yes"] }, 1, 0],
            },
          },
          unTestedPatient: {
            $sum: {
              $cond: [{ $eq: ["$is_tested", "No"] }, 1, 0],
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
