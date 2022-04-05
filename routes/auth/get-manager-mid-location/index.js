const { findOne, getFindSelectPopulateData } = require("../../../helpers");

const getManagerMid = async (req, res) => {
  //  get manager type form userType
  const managerType = await findOne("userType", { type: "Manager" });

  const getManagersMidLocation = await getFindSelectPopulateData(
    "user",
    {
      type: managerType._id,
    },
    "mid",
    "manager_location",
    "location_name"
  );
  res
    .status(200)
    .send({ status: 200, managersMidAndLocation: getManagersMidLocation });
};
module.exports = getManagerMid;
