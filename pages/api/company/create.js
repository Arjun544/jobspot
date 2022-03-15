import prisma from "../../../config/prisma";
import nextConnect from "next-connect";
import upload from "../../../config/multer";

export default nextConnect({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end(`${req.method} not allowed`);
  },
})
  // .use(upload.single("cv"))
  .post(async (req, res) => {
    const { user, company } = req.body;

    // Upload image to cloudinary
    // const result = await cloudinary.uploader.upload(image);
    const newCompany = await prisma.company.create({
      data: {
        ...company,
        user: {
          connect: {
            id: user.id
          }
        },
      },
    });

    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        companyId: newCompany.id,
      },
    });

    return res.json({
      success: true,
      message: "User company created successfully",
    });
  });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
