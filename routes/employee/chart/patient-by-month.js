const { getAggregate } = require("../../../helpers");
const { ObjectID } = require("../../../types");

const patientByMonth = async (req, res) => {
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
    const patients = await getAggregate("patient", [
      {
        $match: { created_by: ObjectID(req.userId) },
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
    for (let i = 0; i < patients.length; i++) {
      patients[i].month = months[patients[i]._id.monthNumber];
    }
    return res.status(200).send({ status: 200, patients });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = patientByMonth;
