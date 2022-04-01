import prisma from "../../../config/prisma";
import nextConnect from "next-connect";

export default nextConnect({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end(`${req.method} not allowed`);
  },
}).get(async (req, res) => {
  const { query } = req.query;

  try {
    const jobs = await prisma.job.findMany({
      where: {
        title: {
          search: query,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        createdBy: true,
        reviews: true,
        applicants: true,
        saveBy: true,
        company: true,
      },
    });

    return res.json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
});
