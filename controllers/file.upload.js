import fs from "fs";
import multer from "multer";
import Profiles from "../models/profile";
import GoogleDriveService from "../services/GoogleDriveService";

export const getListFiles = (req, res) => {
  console.log("I am in getListFiles");
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

export const uploadResumeFile = async (req, res, next) => {
  console.log("In uploadResumeFile");
  try {
    const resume = await new Profiles({
      url: req.file.path,
      fileName: req.file.filename,
      postedBy: req.user._id,
    }).save();
    res.json(resume);

   

    // Google drive upload start
    const client = GoogleDriveService.authenticateGoogle();
    const fileUploadResponse = await GoogleDriveService.uploadToGoogleDrive(
      req.file,
      client
    );
   // console.log ("fileUploadResponse : ", fileUploadResponse);
    //  res.status(200).send({
    //   response: fileUploadResponse,
    //  });

    // Google drive upload end
  } catch (err) {
    console.log(err);
  }

  next("/req/post-candidate/:slug");
};
