import {
  comparePassword,
  generateTokens,
  storeRefreshToken,
} from "../../../helpers/helpers";
import { setCookies } from "cookies-next";
import prisma from "../../../config/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }

    try {
      // Check if user exists
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        return res.json({
          success: false,
          message: "User not found",
        });
      }
      // Compare password
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.json({
          success: false,
          message: "Incorrect credentials",
        });
      }

      // Generate token
      const { accessToken, refreshToken } = generateTokens({
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
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          profile: user.profile,
          type: user.type,
          companyId: user.companyId,
        },
        isAuth: true,
      });
    } catch (err) {
      console.log(err.message);
      res.json({
        success: false,
        message: err.message,
      });
    }
  }
}
