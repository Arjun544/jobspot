import { hashPassword } from "../../../helpers/helpers";
import { prismaClient } from "../../../config/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }

    try {
      // Check if email alread exists
      const hasUser = await prismaClient.user.findUnique({
        where: {
          email,
        },
      });
      if (hasUser) {
        return res.json({
          success: false,
          message: "Email already exists",
        });
      }
      // Hash password
      const hashedPass = await hashPassword(password);

      // Register user
      await prismaClient.user.create({
        data: {
          name,
          email,
          password: hashedPass,
          profile: "",
          type: "finder",
        },
      });
      // Generate token

      return res.status("200").json("User registered successfully");
    } catch (error) {
      console.log(error);
      return res.status(500).json("Server Error");
    }
  }
}
