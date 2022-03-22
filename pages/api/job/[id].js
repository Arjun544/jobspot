import nextConnect from "next-connect";
import prisma from "../../../config/prisma";

export default nextConnect({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end(`${req.method} not allowed`);
  },
}).get(async (req, res) => {
  try {
    const job = await prisma.job.findUnique({
      where: {
        id: +req.query.id, // Convert id to int
      },
      include: {
        createdBy: true,
        reviews: {
          include: {
            user: true
          }
        },
        applicants: true,
        saveBy: true,
        company: true,
      },
    });
    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: err.message,
    });
  }
});
