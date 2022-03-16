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
    const { user } = req.body;
  
    // Upload image to cloudinary
    // const result = await cloudinary.uploader.upload(image);
    await prisma.user.updateMany({
      where: {
        email: user.email,
      },
      data: {
        details: user.details,
        city: user.city,
      },
    });

    return res.json({
      success: true,
      message: "User updated successfully",
    });
  });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
