import express from "express";
import multer from "multer";
import path from "path";
const router = express.Router();

// middleware
import { requireSignin, isAdmin } from "../middlewares";
import { uploadResumeFile } from "../controllers/file.upload";

var storage = multer.diskStorage({
  // Enable destination if we need the local storage to server
  // destination: function (req, file, cb) {
  //   cb(
  //     null,
  //      "C:/Basha/Personal/projects/NyuRay/server/resources/static/assets/uploads"
      
  //   );
  // },

  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    // cb(null, file.originalname + '-' + Date.now()+ '.' +extension)
    cb(null, file.originalname) // save as original file name
  },
});
//var storage = multer.memoryStorage();

var upload = multer({ storage: storage });



router.post(
  "/upload-resume-file",
  requireSignin,
   [ upload.single("file")],
  uploadResumeFile
);

export default router;
