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
  // Get All companies saved by user
  const { userId } = req.body;
  try {
    const companies = await prisma.company.findMany({
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
        reviews: true,
        user: true,
      },
    });
    return res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: err.message,
    });
  }
});
