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
}).use(auth_middleware).post(async (req, res) => {
  const { status, jobId, userId } = req.body;

  try {
    const job =
      status === false
        ? await prisma.job.update({
            where: {
              id: jobId,
            },
            data: {
              saveBy: {
                connect: {
                  id: userId,
                },
              },
            },
          })
        : await prisma.job.update({
            where: {
              id: jobId,
            },
            data: {
              saveBy: {
                disconnect: {
                  id: userId,
                },
              },
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
