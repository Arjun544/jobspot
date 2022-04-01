import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "Jobspot",
    format: ["jpg", "png", "pdf", "jpeg"],
    public_id: "Jobspot",
  },
  transformation: [
    {
      width: 200,
      height: 200,
      crop: "limit",
    },
  ],
});

export default multer({ storage: storage });
