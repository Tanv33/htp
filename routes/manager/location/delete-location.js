const {
  deleteDocument,
  findOneAndUpdate,
  findOneAndPopulate,
  findOne,
} = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  _id: Joi.string().required(),
});

const deleteLocation = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const { _id } = req.body;
    const checkLocaitonExist = await findOne("location", { _id });
    if (!checkLocaitonExist) {
      return res
        .status(400)
        .send({ status: 400, message: "No location found with your given id" });
    }
    const checkUser = await findOneAndPopulate(
      "user",
      {
        _id: req.userId,
      },
      "type"
    );
    if (checkUser?.type?.type === "Manager") {
      await findOneAndUpdate(
        "user",
        { _id: req.userId },
        {
          $pullAll: {
            manager_location: [_id],
          },
        }
      );
    }
    if (checkUser?.type?.type === "Asins") {
      await findOneAndUpdate(
        "user",
        { _id: checkLocaitonExist?.created_by },
        {
          $pullAll: {
            manager_location: [_id],
          },
        }
      );
    }
    await deleteDocument("location", { _id });
    return res
      .status(200)
      .send({ status: 200, message: "Location deleted successfully" });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = deleteLocation;

// const {
//   deleteDocument,
//   findOneAndUpdate,
//   findOneAndPopulate,
//   findOne,
// } = require("../../../helpers");
// const Joi = require("joi");

// const managerSchema = Joi.object({
//   _id: Joi.string().required(),
// });

// const adminSchema = Joi.object({
//   _id: Joi.string().required(),
//   manager_id: Joi.string().required(),
// });

// const deleteLocation = async (req, res) => {
//   try {
//     const { manager_id, _id } = req.body;
//     const checkUser = await findOneAndPopulate(
//       "user",
//       {
//         _id: req.userId,
//       },
//       "type"
//     );
//     if (checkUser?.type?.type === "Manager") {
//       await managerSchema.validateAsync(req.body);
//     }
//     if (checkUser?.type?.type === "Asins") {
//       await adminSchema.validateAsync(req.body);
//       const findManager = await findOne("user", {
//         _id: manager_id,
//       });
//       // console.log(findManager);
//       if (!findManager) {
//         return res.status(404).send({
//           status: 404,
//           message: "NO manager found with your given manager id",
//         });
//       }
//       const checkAtuhorOfLocation = await findOne("user", {
//         _id: manager_id,
//         manager_location: _id,
//       });
//       console.log(checkAtuhorOfLocation);
//       if (!checkAtuhorOfLocation) {
//         return res.status(400).send({
//           status: 400,
//           message: "This location does not belong  to your given manager",
//         });
//       }
//     }
//     const checkLocaitonExist = await findOne("location", { _id });
//     if (!checkLocaitonExist) {
//       return res
//         .status(400)
//         .send({ status: 400, message: "No location found with your given id" });
//     }
//     if (checkUser?.type?.type === "Manager") {
//       await findOneAndUpdate(
//         "user",
//         { _id: req.userId },
//         {
//           $pullAll: {
//             manager_location: [_id],
//           },
//         }
//       );
//     }
//     if (checkUser?.type?.type === "Asins") {
//       await findOneAndUpdate(
//         "user",
//         { _id: manager_id },
//         {
//           $pullAll: {
//             manager_location: [_id],
//           },
//         }
//       );
//     }
//     await deleteDocument("location", { _id });
//     return res
//       .status(200)
//       .send({ status: 200, message: "Location deleted successfully" });
//   } catch (e) {
//     console.log(e);
//     return res.status(400).send({ status: 400, message: e.message });
//   }
// };
// module.exports = deleteLocation;
