const {
  findOne,
  findOneAndPopulate,
  getAggregate,
  find,
} = require("../../helpers");

const getUserTestType = async (req, res) => {
  try {
    const check_user = await findOneAndPopulate(
      "user",
      { _id: req.userId },
      "type"
    );
    if (check_user?.type?.type === "Asins") {
      const specificUser = await find("userType", {
        type: { $in: ["Manager", "Production Manager"] },
      });
      const bothManagers = specificUser.map((element) => element?._id);
      const allUserTypes = await getAggregate("user", [
        {
          $match: {
            type: { $in: bothManagers },
          },
        },
        {
          $project: {
            full_name: 1,
            mid: 1,
            pmid: 1,
            user_test_type: 1,
          },
        },
      ]);
      return res.status(200).send({
        status: 200,
        allUserTypes,
      });
    }
    const user = await findOne("user", {
      _id: req.userId,
    });
    const { user_test_type } = user;
    return res.status(200).send({
      status: 200,
      user_test_type,
    });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getUserTestType;
