import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadCloundinaryFile = async (localfilepath)=>{
        try {
            if(!localfilepath) return null;
         const response =  await cloudinary.uploader.upload(localfilepath,{
            resource_type: "auto"
         });
         console.log("file is uploaded successfully ",response.url);
         return response;

        } catch (error) {
           fs.unlinkSync(localfilepath) //file is removed that is locally saved on our server
           return null; 
        }
}


export {uploadCloundinaryFile}




       