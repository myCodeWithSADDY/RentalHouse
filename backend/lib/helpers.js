//upload to cloudinary server
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
const getBase64 = (file) =>
  `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      if (file.size > 1024 * 1024 * 5) {
        // Limit file size to 5MB
        reject(new Error("File size is too large"));
      }
      cloudinary.uploader.upload(
        getBase64(file),
        { resource_type: "auto", public_id: uuid(), type: "upload" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromises);
    const formattedResult = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
    return formattedResult;
  } catch (error) {
    throw new Error("Error uploading files", error);
  }
};

export { uploadFilesToCloudinary };
