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
    const { applyingAs, user, job, companyId } = req.body;

    // Upload image to cloudinary
    // const result = await cloudinary.uploader.upload(image);

    applyingAs === "individual"
      ? await prisma.job.create({
          data: {
            ...job,
            createdBy: {
              connect: {
                id: user.id,
              },
            },
          },
        })
      : await prisma.job.create({
          data: {
            ...job,
            createdBy: {
              connect: {
                id: user.id,
              },
            },
            company: {
              connect: {
                id: companyId,
              },
            },
          },
        });

    return res.json({
      success: true,
      message: "Job created successfully",
    });
  });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
