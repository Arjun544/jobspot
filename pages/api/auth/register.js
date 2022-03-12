import {
  generateToken,
  hashPassword,
  storeRefreshToken,
} from "../../../helpers/helpers";
import { setCookies } from "cookies-next";
import { prismaClient } from "../../../config/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
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
      const user = await prismaClient.user.create({
        data: {
          name,
          email,
          password: hashedPass,
          profile: "",
          type: "finder",
        },
      });
      // Generate token
      const { accessToken, refreshToken } = generateToken({
        id: user.id,
        isActivited: false,
      });
      // Store refresh token
      await storeRefreshToken(refreshToken, user.id);
      // Set cookie
      setCookies("refreshToken", refreshToken, {
        req,
        res,
        httpOnly: true,
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
      setCookies("accessToken", accessToken, {
        req,
        res,
        httpOnly: true,
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });

      return res.json({
        user: { name: user.name, email: user.email, profile: user.profile },
        isAuth: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json("Server Error");
    }
  }
}
