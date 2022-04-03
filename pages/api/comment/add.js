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
  .post(async (req, res) => {
    const { userId, comment, companyId, jobId } = req.body;

    try {
      const job =
        companyId !== null
          ? await prisma.review.create({
              data: {
                comment: comment,
                user: {
                  connect: {
                    id: userId,
                  },
                },
                company: {
                  connect: {
                    id: companyId,
                  },
                },
                job: {
                  connect: {
                    id: jobId,
                  },
                },
              },
            })
          : await prisma.review.create({
              data: {
                comment: comment,
                user: {
                  connect: {
                    id: userId,
                  },
                },
                job: {
                  connect: {
                    id: jobId,
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
