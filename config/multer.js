import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  folder: "Jobspot Images",
  allowedFormats: ["jpg", "png"],
  transformation: [
    {
      width: 200,
      height: 200,
      crop: "limit",
    },
  ],
  cloudinary: cloudinary,
});

export default multer({ storage: storage });
