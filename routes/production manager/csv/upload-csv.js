const {
  csvFileArr,
  insertNewDocument,
  findOneAndUpdate,
} = require("../../../helpers");

const uploadCsv = async (req, res) => {
  try {
    console.log(req.file);
    if (!req.file) {
      return res
        .status(400)
        .send({ status: 400, mesaage: "CSV file required" });
    }
    if (req.file.mimetype !== "text/csv") {
      return res
        .status(400)
        .send({ status: 400, mesaage: "Only CSV file allowed" });
    }
    const fileData = await csvFileArr(req.file.path);
    const newData = Array.from(new Set(fileData.map(JSON.stringify))).map(
      JSON.parse
    );
    const duplicate = fileData.length - newData.length;
    // io.emit("csv", {
    //   givenData: fileData.length,
    //   acceptedData: newData.length,
    //   duplicate,
    // });
    await newData.map(async (object, index, arr) => {
      const percentage = (((index + 1) * 100) / arr.length).toFixed(0);
      object.created_by = req.userId;
      object.production = true;
      // generate pid
      const numberDoc = await findOneAndUpdate(
        "NumberGeneratorModel",
        { name: "pid" },
        { $inc: { value: 1 } },
        { new: true }
      );
      const value = numberDoc.value;
      const sequenceNumber = (value + "").padStart(4, "0");
      const pid = "pid-" + sequenceNumber;
      object.pid = pid;
      await insertNewDocument("patient", object);
      // console.log(percentage);
      if (percentage == 25) {
        console.log("25% Done");
        // io.emit("csv", {
        //   message: "25% Done",
        // });
      }
      if (percentage == 50) {
        console.log("50% Done");
        // io.emit("csv", {
        //   message: "50% Done",
        // });
      }
      if (percentage == 75) {
        console.log("75% Done");
        // io.emit("csv", {
        //   message: "75% Done",
        // });
      }
      if (percentage == 100) {
        console.log("100% Done");
        // io.emit("csv", {
        //   message: "100% Done",
        // });
        return res.status(200).send({
          status: 200,
          message: "CSV file uploaded successfully ",
          givenData: fileData.length,
          acceptedData: newData.length,
          duplicate,
        });
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, mesaage: e.message });
  }
};

module.exports = uploadCsv;
