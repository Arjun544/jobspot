import prisma from "../../config/prisma";
import nextConnect from "next-connect";

export default nextConnect({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end(`${req.method} not allowed`);
  },
}).post(async (req, res) => {
  const { query, location, salary } = req.body;
  const city = location.split(",")[0];
  const province = location.split(",")[1];
  const country = location.split(",")[2];

  console.log([+salary].filter((n) => n < salary));

  try {
    const jobs = await prisma.job.findMany({
      where: {
        title: {
          search: query,
        },
        location: {
          search: `${city} & ${province} & ${country}`,
        },
        salary: {
          search: salary,
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
