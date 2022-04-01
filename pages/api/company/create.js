import prisma from "../../../config/prisma";
import nextConnect from "next-connect";
import cloudinary from "cloudinary";
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
    const { user, company, image } = req.body;

    // Upload cv to cloudinary
    let result;
    try {
      result = await cloudinary.v2.uploader.upload(image, {
        folder: "Jobspot",
      });
    } catch (error) {
      console.log(error);
    }
    const newCompany = await prisma.company.create({
      data: {
        ...company,
        image: result.secure_url,
        imageId: result.public_id,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    const newUser = await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        companyId: newCompany.id,
      },
    });

    return res.json({
      success: true,
      isAuth: true,
      user: newUser,
      message: "User company created successfully",
    });
  });

export const config = {
  api: {
    bodyParser: false,
  },
};
