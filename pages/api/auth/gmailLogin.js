import {
  generateTokens,
  hashPassword,
  storeRefreshToken,
} from "../../../helpers/helpers";
import { setCookies } from "cookies-next";
import prisma from "../../../config/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    try {
      // Check if email already exists
      const hasUser = await prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          profile: true,
          details:true,
          type: true,
          city: true,
          companyId: true,
        },
      });

      if (!hasUser) {
        return res.json({
          success: false,
          message: "User not found, please signup",
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
          details: user.details,
          type: user.type,
          city: user.city,
          companyId: user.companyId,
        },
        isAuth: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json("Server Error");
    }
  }
}
