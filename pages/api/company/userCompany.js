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
  // Get user comapnies
  try {
    const company = await prisma.company.findUnique({
      where: {
        userId: +req.body.userId,
      },
      include: {
        reviews: true,
        user: true,
      },
    });
    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: err.message,
    });
  }
});
