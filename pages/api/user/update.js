import prisma from "../../../config/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, user } = req.body;
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(image);

      await prisma.user.updateMany({
        where: {
          email: email,
        },
        data: {
          user: user,
        },
      });

      return res.json({
        success: true,
        message: "User updated successfully",
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
