const {
  csvFileArr,
  updateDocument,
  findOneAndPopulate,
  generatePdf,
  generateRandomNumber,
  getDropBoxLink,
  todayDateFormat,
  insertNewDocument,
} = require("../../../helpers");
const { send_email } = require("../../../lib");
const testResultSignOff = require("../../../public/pdf/testResultSignoff");

const firePatientWithCsv = async (req, res) => {
  try {
    console.log(req.file);
    if (!req.file) {
      return res
        .status(400)
        .send({ status: 400, mesaage: "CSV file required" });
    }
    const csvRegex = /.csv$/g;
    if (!csvRegex.test(req?.file?.originalname)) {
      return res
        .status(400)
        .send({ status: 400, mesaage: "Only CSV file allowed" });
    }
    const fileData = await csvFileArr(req.file.path);
    const newData = Array.from(new Set(fileData.map(JSON.stringify))).map(
      JSON.parse
    );
    console.log("newData", newData);
    for (let index = 0; index < newData.length; index++) {
      if (
        !newData[index]?.order_no ||
        !newData[index]?.pid ||
        !newData[index]?.patient_result
      ) {
        return res
          .status(400)
          .send({ status: 400, message: "field missing in csv" });
      }
    }
    const duplicate = fileData.length - newData.length;
    // io.emit("csv", {
    //   givenData: fileData.length,
    //   acceptedData: newData.length,
    //   duplicate,
    // });
    for (let i = 0; i < newData.length; i++) {
      const percentage = (((i + 1) * 100) / newData.length).toFixed(0);
      const findPatient = await findOneAndPopulate(
        "patient",
        {
          is_tested: "Yes",
          pid: newData[i]?.pid,
          order_no: newData[i]?.order_no,
        },
        "location_id"
      );
      if (!findPatient) {
        return res.status(400).send({
          status: 400,
          user: {
            pid: newData[i]?.pid,
            order_no: newData[i]?.order_no,
          },
          message: "No Patient Found with your given credentials",
        });
      }
      const testResult = await generatePdf(
        testResultSignOff(
          findPatient,
          "Your Covid Rapid Result is " + newData[i]?.patient_result
        ),
        `./public/rapidfire pdf/rapid${generateRandomNumber(
          11111,
          99999
        ).toFixed(0)}.pdf`
      );
      // getting signaturepdf URL from Dropbox
      const firePatientPdfLink = await getDropBoxLink(
        "/fire  pdf/" +
          `${newData[i]?.order_no}-${generateRandomNumber(11111, 99999).toFixed(
            0
          )}.pdf`,
        testResult.filename,
        false
      );
      const patient_result_date = todayDateFormat();
      const patient_test_result_sign_off = firePatientPdfLink;
      await updateDocument(
        "patient",
        {
          is_tested: "Yes",
          order_no: newData[i]?.order_no,
          pid: newData[i]?.pid,
        },
        {
          patient_result_date,
          patient_test_result_sign_off,
          patient_result: newData[i]?.patient_result,
        }
      );
      send_email(
        res,
        "patientResultTemp",
        {
          fullName: findPatient?.first_name + " " + findPatient?.last_name,
          testNmae: findPatient?.test_type?.type,
          testLocaiton: findPatient?.location_id?.location_name,
          telephone: findPatient?.telephone,
          locationDescription: findPatient?.location_id?.consent,
          location_logo: findPatient?.location_id?.location_logo,
        },
        "Health Titan Pro",
        "Your Covid Rapid result",
        findPatient.email,
        [
          {
            filename: "result.pdf",
            path: testResult.filename, // Path of signature file
          },
        ]
      );
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
        const uploadHistory = await insertNewDocument("uploadHistory", {
          total_result: fileData.length,
          uploaded_result: newData.length,
          duplicate_result: duplicate,
          created_by: req.userId,
        });
        const duplicatePids = fileData
          .map((v) => v.pid)
          .filter((v, i, vIds) => vIds.indexOf(v) !== i);
        const duplicateOrder_no = fileData
          .map((v) => v.order_no)
          .filter((v, i, vOrder) => vOrder.indexOf(v) !== i);
        const duplicatePatient_result = fileData
          .map((v) => v.patient_result)
          .filter((v, i, vPatient) => vPatient.indexOf(v) !== i);
        const duplicates = fileData.filter((obj) => {
          return (
            duplicatePids.includes(obj.pid) &&
            duplicateOrder_no.includes(obj.order_no) &&
            duplicatePatient_result.includes(obj.patient_result)
          );
        });
        console.log("duplicates", duplicates);
        const duplicateCsvData = Array.from(
          new Set(duplicates.map(JSON.stringify))
        ).map(JSON.parse);
        console.log(duplicateCsvData);
        duplicateCsvData.map(async (obj) => {
          const check = await insertNewDocument("duplicateCsvLts", {
            csv_id: uploadHistory._id,
            pid: obj.pid,
            patient_result: obj.patient_result,
            order_no: obj.order_no,
            created_by: req.userId,
          });
          console.log(check);
        });
        return res.status(200).send({
          status: 200,
          message: "CSV file uploaded successfully",
          uploadHistory,
        });
      }
    }

    // await newData.map(async ({ order_no, pid, patient_result }, index, arr) => {
    //   const percentage = (((index + 1) * 100) / arr.length).toFixed(0);
    //   const findPatient = await findOneAndPopulate(
    //     "patient",
    //     {
    //       is_tested: "Yes",
    //       pid,
    //       order_no,
    //     },
    //     "location_id"
    //   );
    //   if (!findPatient) {
    //     return res.status(400).send({
    //       status: 400,
    //       message: "No Patient Found with your given credentials",
    //     });
    //   }
    //   const testResult = await generatePdf(
    //     testResultSignOff(
    //       findPatient,
    //       "Your Covid Rapid Result is " + patient_result
    //     ),
    //     `./public/rapidfire pdf/rapid${generateRandomNumber(
    //       11111,
    //       99999
    //     ).toFixed(0)}.pdf`
    //   );
    //   // getting signaturepdf URL from Dropbox
    //   const firePatientPdfLink = await getDropBoxLink(
    //     "/fire  pdf/" +
    //       `${order_no}-${generateRandomNumber(11111, 99999).toFixed(0)}.pdf`,
    //     testResult.filename,
    //     false
    //   );
    //   const patient_result_date = todayDateFormat();
    //   const patient_test_result_sign_off = firePatientPdfLink;
    //   await updateDocument(
    //     "patient",
    //     {
    //       is_tested: "Yes",
    //       order_no,
    //       pid,
    //     },
    //     { patient_result_date, patient_test_result_sign_off, patient_result }
    //   );
    //   send_email(
    //     res,
    //     "patientResultTemp",
    //     {
    //       fullName: findPatient?.first_name + " " + findPatient?.last_name,
    //       testNmae: findPatient?.test_type?.type,
    //       testLocaiton: findPatient?.location_id?.location_name,
    //       telephone: findPatient?.telephone,
    //       locationDescription: findPatient?.location_id?.consent,
    //       location_logo: findPatient?.location_id?.location_logo,
    //     },
    //     "Health Titan Pro",
    //     "Your Covid Rapid result",
    //     findPatient.email,
    //     [
    //       {
    //         filename: "result.pdf",
    //         path: testResult.filename, // Path of signature file
    //       },
    //     ]
    //   );

    //   // console.log(percentage);
    //   if (percentage == 25) {
    //     console.log("25% Done");
    //     // io.emit("csv", {
    //     //   message: "25% Done",
    //     // });
    //   }
    //   if (percentage == 50) {
    //     console.log("50% Done");
    //     // io.emit("csv", {
    //     //   message: "50% Done",
    //     // });
    //   }
    //   if (percentage == 75) {
    //     console.log("75% Done");
    //     // io.emit("csv", {
    //     //   message: "75% Done",
    //     // });
    //   }
    //   if (percentage == 100) {
    //     console.log("100% Done");
    //     // io.emit("csv", {
    //     //   message: "100% Done",
    //     // });
    //     return res.status(200).send({
    //       status: 200,
    //       message: "CSV file uploaded successfully ",
    //       givenData: fileData.length,
    //       acceptedData: newData.length,
    //       duplicate,
    //     });
    //   }
    // });
    // return res.status(200).send({
    //   status: 200,
    //   message: "Api is in progress",
    // });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, mesaage: e.message });
  }
};

module.exports = firePatientWithCsv;
