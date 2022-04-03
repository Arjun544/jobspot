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
}).post(async (req, res) => {
  // Get All jobs saved by user
  const { userId } = req.body;
  try {
    const jobs = await prisma.user.findMany({
      where: {
        saveBy: {
          some: {
            id: +userId,
          },
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
    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: err.message,
    });
  }
});
