import prisma from "../../../config/prisma";
import cloudinary from "cloudinary";
import nextConnect from "next-connect";
import upload from "../../../config/multer";
import bodyParser from "body-parser";

export default nextConnect({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end(`${req.method} not allowed`);
  },
})
  .use(upload.single("image"))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json({ limit: "50mb" }))
  .post(async (req, res) => {
    const { email, name, profile, profileId } = req.body;

    try {
      //   Delete old profile
      await cloudinary.v2.uploader.destroy(profileId);
      // Upload new profile to cloudinary
      const updatedCv = await cloudinary.v2.uploader.upload(profile, {
        folder: "Jobspot",
      });
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          name,
          profile: updatedCv.secure_url,
          profileId: updatedCv.public_id,
        },
      });
      return res.json({
        success: true,
        message: "Profile updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: error.message,
      });
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};
