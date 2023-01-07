import { google } from "googleapis";
import fs from "fs";

export class GoogleDriveService{

    static getAuth = () => {
       // console.log("getAuth");
        return new google.auth.GoogleAuth({
            keyFile: `${__dirname}/../google_credentials.json`,
            scopes: "https://www.googleapis.com/auth/drive",
        })
    }

    static getDriveService = ()=>{
       // console.log("getDriveService");
        const auth = GoogleDriveService.getAuth();
        return google.drive({ version: 'v3', auth});
    }

    static authenticateGoogle = () => {
      //  console.log("authenticateGoogle");
        const auth = new google.auth.GoogleAuth({
          keyFile: `${__dirname}/../google_credentials.json`,
          scopes: "https://www.googleapis.com/auth/drive",
        });
        // google.options({auth});
        return auth;
      };

      static uploadToGoogleDrive = async (file, auth) => {
       // console.log("uploadToGoogleDrive");
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
        //console.log ("File Response", response);
        return response;
      };

      //create a public url
static  generatePublicUrl = async (fileId, auth)=> {
  try {
     // const fileId = '19VpEOo3DUJJgB0Hzj58E6aZAg10MOgmv';
      //change file permisions to public.
      const driveService = google.drive({ version: "v3",  auth: auth });
       await driveService.permissions.create({
          fileId: fileId,
          requestBody: {
          role: 'reader',
          type: 'anyone',
          },
      });

      //obtain the webview and webcontent links
      const result = await driveService.files.get({
          fileId: fileId,
          fields: 'webViewLink, webContentLink',
      });
  //  console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error.message);
  }
}
}




export default GoogleDriveService;
