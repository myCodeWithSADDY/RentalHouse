import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory before uploading

const multerUpload = multer({
  storage, // Use memory storage
  limits: { fileSize: 1024 * 1024 * 50 }, // Limit file size to 50MB
});

const uploadSingle = multerUpload.single("images"); // Ensure "images" matches the form-data key in Postman
const uploadMultiple = multerUpload.array("images", 5); // Allows multiple images

export { uploadSingle, uploadMultiple };
