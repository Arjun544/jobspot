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
}).delete(async (req, res) => {
  const { id, userId } = req.body;

  try {
    await prisma.job.delete({
      where: {
        id: id,
        userId: userId,
      },
    });

    return res.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: true,
      message: "Something went wrong",
    });
  }
});

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
