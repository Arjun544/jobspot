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
  .use(upload.single("user"))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json({ limit: "50mb" }))
  .post(async (req, res) => {
    const { user } = req.body;

    // Upload profile & cv to cloudinary
    let cvResult;
    let profileResult;
    try {
      cvResult = await cloudinary.v2.uploader.upload(user.cv, {
        transformation: {
          flags: `attachment:${Date.now()}`,
          fetch_format: "png",
        },
        format: "png",
        folder: "Jobspot",
      });
      profileResult = await cloudinary.v2.uploader.upload(user.profile, {
        folder: "Jobspot",
      });
    } catch (error) {
      console.log(error);
    }
    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        details: user.details,
        city: user.city,
        profile: profileResult.secure_url,
        profileId: profileResult.public_id,
        cv: cvResult.secure_url,
        cvId: cvResult.public_id,
      },
    });

    return res.json({
      success: true,
      message: "User updated successfully",
    });
  });

export const config = {
  api: {
    bodyParser: false,
  },
};
