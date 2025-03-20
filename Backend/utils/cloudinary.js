import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("Cloudinary Configuration:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY ? "SET" : "MISSING",
    api_secret: process.env.CLOUDINARY_API_SECRET ? "SET" : "MISSING",
  });

/**
 * Function to upload multiple files to Cloudinary.
 * @param {Array<string>} filePaths - Array of local file paths.
 * @returns {Array<object>} - Array of Cloudinary response objects or an empty array if no files are uploaded.
 */
const uploadMultipleFiles = async (filePaths) => {
  const allowedFileTypes = ['.pdf', '.doc', '.docx', '.zip'];
  const uploadedFiles = [];

  for (const filePath of filePaths) {
    try {
        console.log("Processing file:", filePath);
        if (!filePath) {
          console.warn("Empty file path encountered, skipping.");
          continue;
        }

      // Get the file extension
      const fileExtension = path.extname(filePath).toLowerCase();

      // Validate file type
      if (!allowedFileTypes.includes(fileExtension)) {
        console.error(`Invalid file type: ${fileExtension}. Allowed types are: ${allowedFileTypes.join(', ')}`);
        fs.unlinkSync(filePath); // Remove invalid file
        continue;
      }

      // Upload the file to Cloudinary
      const response = await cloudinary.uploader.upload(filePath, {
        resource_type: 'auto', // Auto-detect the resource type
      });
      //file has been uploaded successfully
        console.log("file is uploaded on cloudinary:  ",response.url);
      // Remove the file from local storage after successful upload
      fs.unlinkSync(filePath);

      uploadedFiles.push(response);
    } catch (error) {
      console.error('Error uploading file:', error);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Remove the file if an error occurs
      }
    }
  }

  return uploadedFiles;
};

export { uploadMultipleFiles };
