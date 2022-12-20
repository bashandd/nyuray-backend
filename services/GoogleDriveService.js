import { google } from "googleapis";
import fs from "fs";

export class GoogleDriveService{

    static getAuth = () => {
        console.log("getAuth");
        return new google.auth.GoogleAuth({
            keyFile: `${__dirname}/../google_credentials.json`,
            scopes: "https://www.googleapis.com/auth/drive",
        })
    }

    static getDriveService = ()=>{
        console.log("getDriveService");
        const auth = GoogleDriveService.getAuth();
        return google.drive({ version: 'v3', auth});
    }

    static authenticateGoogle = () => {
        console.log("authenticateGoogle");
        const auth = new google.auth.GoogleAuth({
          keyFile: `${__dirname}/../google_credentials.json`,
          scopes: "https://www.googleapis.com/auth/drive",
        });
        // google.options({auth});
        return auth;
      };

      static uploadToGoogleDrive = async (file, auth) => {
        console.log("uploadToGoogleDrive");
        const fileMetadata = {
          name: file.originalname,
          parents: ["1Amv-3tL0x0gnLo-CMBDf4Li14mjtRM4k"], // Change it according to your desired parent folder id
        };
      
        const media = {
          mimeType: file.mimetype,
          body: fs.createReadStream(file.path),
        };
    
        const driveService = google.drive({ version: "v3",  auth: auth });
      
        const response = await driveService.files.create({
          requestBody: fileMetadata,
          media: media,
          fields: "id",
        });
        return response;
      };
}


export default GoogleDriveService;
