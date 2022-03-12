import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prismaClient } from "../config/prisma";

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Hashing failed", error);
  }
};

export const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.accessTokenSecret, {
    expiresIn: "1m",
  });
  const refreshToken = jwt.sign(payload, process.env.refreshTokenSecret, {
    expiresIn: "1y",
  });
  return { accessToken, refreshToken };
};

export const storeRefreshToken = async (token, userId) => {
  try {
    await prismaClient.token.create({
      data: {
        token,
        userId,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const verifyAccessToken = (token) =>
  jwt.verify(token, process.env.accessTokenSecret);

export const verifyRefreshToken = (token) =>
  jwt.verify(token, process.env.refreshTokenSecret);

export const findRefreshToken = async (userId, refreshToken) => {
  return await prismaClient.token.findUnique({
    where: {
      userId: userId,
      token: refreshToken,
    },
  });
};

export const updateRefreshToken = async (userId, refreshToken) => {
  return await prismaClient.token.update({
    where: {
      userId: userId,
    },
    data: {
      token: refreshToken,
    },
  });
};

export const removeToken = async (refreshToken) => {
  return await prismaClient.token.delete({
    where: {
      token: refreshToken,
    },
  });
};
