import prisma from "../../../config/prisma";

export default async function handler(req, res) {
  if (req.method === "Get") {
    try {
      const jobs = await prisma.job.findMany();
      console.log(jobs);
      return res.json({
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
  }
}
