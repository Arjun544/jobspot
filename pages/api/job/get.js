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
})
  .get(async (req, res) => {
    try {
      const jobs = await prisma.job.findMany();
      return res.status(200).send({
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