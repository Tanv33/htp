const Models = require("../models");
const QRCode = require("qrcode");
const { dbx } = require("../lib");
const fs = require("fs");
var atob = require("atob");
var pdf = require("html-pdf");
const csv = require("csv-parser");

const find = async (modelDb, queryObj) =>
  await Models[modelDb].find(queryObj).exec();
const findOne = async (modelDb, queryObj) =>
  await Models[modelDb].findOne(queryObj).exec();
const findOneAndUpdate = async (modelDb, findObj, update, option) =>
  await Models[modelDb].findOneAndUpdate(findObj, update, option).exec();
const searchDocuments = async (modelDb, queryObj) =>
  await Models[modelDb].find(queryObj).exec();
const updateDocument = async (modelDb, updateQuery, setQuery) => {
  return Models[modelDb].updateOne(updateQuery, { $set: setQuery });
};

const updateManyDocument = async (modelDb, updateQuery, setQuery) => {
  return Models[modelDb].updateMany(updateQuery, { $set: setQuery });
};
const customUpdate = async (modelDb, updateQuery, setQuery) => {
  return Models[modelDb].update(updateQuery, setQuery);
};
const findOneSort = async (modelDb, queryObj) =>
  await Models[modelDb]?.findOne(queryObj).sort({ _id: -1 }).exec();

const insertNewDocument = async (modelDb, storeObj) => {
  let data = new Models[modelDb](storeObj);
  return await data.save();
};

const getPopulatedData = async (
  modelDb,
  searchQuery,
  populateQuery,
  selectQuery
) =>
  await Models[modelDb]
    .find(searchQuery)
    .populate({ path: populateQuery, select: selectQuery })
    .lean();

const findOneAndPopulate = async (
  modelDb,
  searchQuery,
  populateQuery,
  selectQuery
) =>
  await Models[modelDb]
    .findOne(searchQuery)
    .populate({ path: populateQuery, select: selectQuery })
    .lean();

const getFindSelectPopulateData = async (
  modelDb,
  searchQuery,
  selectOnFind,
  populateQuery,
  selectQuery
) =>
  await Models[modelDb]
    .find(searchQuery)
    .select(selectOnFind)
    .populate({ path: populateQuery, select: selectQuery });

const findOneAndSelect = async (modelDb, searchQuery, selectOnFind) =>
  await Models[modelDb].findOne(searchQuery).select(selectOnFind).lean();

const findAndSelect = async (modelDb, searchQuery, selectOnFind) =>
  await Models[modelDb].find(searchQuery).select(selectOnFind).lean();

const getPopulated = async (modelDb, prevDocRef, populateQuery) =>
  await Models[modelDb].populate(prevDocRef, populateQuery);

const getAggregate = async (modelDb, aggregateQuery) =>
  await Models[modelDb].aggregate(aggregateQuery);
const getCount = async (modelDb, aggregateQuery) =>
  await Models[modelDb].find(aggregateQuery).count();

const deleteDocument = async (modelDb, deleteQuery) =>
  await Models[modelDb].deleteOne(deleteQuery);

const pushIfNotExists = async (modelDb, searchQuery, pushQuery) =>
  await Models[modelDb].update(searchQuery, { $addToSet: pushQuery });

const getDataWithLimit = async (modelDb, searchQuery, sortedBy, skip, limit) =>
  await Models[modelDb]
    .find(searchQuery)
    .sort(sortedBy)
    .skip(skip)
    .limit(limit)
    .exec();

const getPopulatedDataWithLimit = async (
  modelDb,
  searchQuery,
  populateQuery,
  selectQuery,
  sortedBy,
  skip,
  limit
) =>
  await Models[modelDb]
    .find(searchQuery)
    .populate({ path: populateQuery, select: selectQuery })
    .sort(sortedBy)
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();

const helperFunctionForQrCode = async (pid) => {
  return await QRCode.toFile(`./public/qrcodes/${pid}.png`, pid);
  // return new Promise((resolve, reject) => {
  //   QRCode.toFile(`./public/qrcodes/${pid}.png`, pid, (err, url) => {
  //     if (err) {
  //       reject("error");
  //     }
  //     console.log(err);
  //     resolve(url);
  //   });
  // });
};

// Dropbox
const getDropBoxLink = async (dropBoxPath, filePath, arrayBuffer) => {
  var newPath;
  if (arrayBuffer) {
    newPath = filePath;
  } else {
    newPath = fs.readFileSync(filePath);
  }
  const fileUpload = await dbx.filesUpload({
    path: dropBoxPath,
    contents: newPath,
  });
  const sharedLink = await dbx.sharingCreateSharedLinkWithSettings({
    path: fileUpload.result.path_display,
    settings: {
      requested_visibility: "public",
      audience: "public",
      access: "viewer",
    },
  });
  return sharedLink.result.url?.replace(/dl=0$/, "raw=1");
};

// Base64 To array Buffer
function _base64ToArrayBuffer(base64) {
  var binary_string = atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

// Pdf Generator
const generatePdf = async (htmlFilePath, localDirectoryLocation) => {
  return new Promise((resolve, reject) => {
    pdf
      .create(htmlFilePath, {
        format: "Letter",
      })
      .toFile(localDirectoryLocation, (err, data) => {
        if (err) {
          // return res
          //   .status(400)
          //   .send({ status: 400, message: "Error in Generating PDF" });
          reject("error");
        }
        // console.log(data);
        resolve(data);
      });
  });
};

// Generate Random Number
const generateRandomNumber = (min, max) => Math.random() * (max - min) + min;

// check string is base64 or not
const base64regex =
  /^data:image\/[a-z]+;base64,([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

// DateFormat
const dateFormat = () => {
  let date = new Date();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }

  //	date.setDate(date.getDate()+adds)
  return `${date.getFullYear()}${month}${day}`;
  //	return Math.ceil(date.getTime()/1000)
};
// DateFormatWith"-"sign
const todayDateFormat = () => {
  let date = new Date();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }

  //	date.setDate(date.getDate()+adds)
  return `${date.getFullYear()}-${month}-${day}`;
  //	return Math.ceil(date.getTime()/1000)
};

const csvFileArr = (filePath) => {
  return new Promise((resolve) => {
    let results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", async (data) => {
        // let newObject = data;
        // let test_type = {
        //   name: data?.name,
        //   type: data?.type,
        // };
        // delete newObject?.name;
        // delete newObject?.type;
        // newObject = { ...data, test_type };
        // results.push(newObject);
        results.push(data);
      })
      .on("end", async () => {
        resolve(results);
      });
  });
};

module.exports = {
  getPopulated,
  searchDocuments,
  updateDocument,
  insertNewDocument,
  deleteDocument,
  getPopulatedData,
  getAggregate,
  findOne,
  find,
  pushIfNotExists,
  findOneSort,
  helperFunctionForQrCode,
  getDropBoxLink,
  generateRandomNumber,
  getFindSelectPopulateData,
  _base64ToArrayBuffer,
  generatePdf,
  base64regex,
  dateFormat,
  findOneAndUpdate,
  getDataWithLimit,
  getCount,
  getPopulatedDataWithLimit,
  todayDateFormat,
  findOneAndSelect,
  csvFileArr,
  findOneAndPopulate,
  findAndSelect,
  updateManyDocument,
  customUpdate,
};
