import multer from "multer";

const multerUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 50, // 10MB
  },
});

const singlePhoto = multerUpload.single("profilePicture");
const attachmentsMulter = multerUpload.array("files", 5);
export { singlePhoto, attachmentsMulter };
