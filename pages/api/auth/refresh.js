import prisma from "../../../config/prisma";
import { getCookies, setCookies } from "cookies-next";
import {
  findRefreshToken,
  verifyRefreshToken,
  generateTokens,
  updateRefreshToken,
} from "../../../helpers/helpers";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // get refresh token from cookie
    const { refreshToken: refreshTokenFromCookie } = getCookies({ req, res });
    // check if token is valid
    let userData;
    try {
      userData = await verifyRefreshToken(refreshTokenFromCookie);
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    // Check if token is in db
    try {
      const token = await findRefreshToken(userData.id, refreshTokenFromCookie);
      if (!token) {
        return res.status(401).json({ message: "Invalid token" });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal error" });
    }
    // check if valid user
    const user = await prisma.user.findUnique({
      where: {
        id: userData.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        profile: true,
        type: true,
        city: true,
        companyId: true,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "No user" });
    }
    // Generate new tokens
    const { refreshToken, accessToken } = generateTokens({
      id: userData.id,
    });

    // Update refresh token
    try {
      await updateRefreshToken(userData.id, refreshToken);
    } catch (err) {
      return res.status(500).json({ message: "Internal error" });
    }
    // put in cookie
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
    // response
    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: user.profile,
        type: user.type,
        city: user.city,
        companyId: user.companyId,
      },
      isAuth: true,
    });
  }
}
