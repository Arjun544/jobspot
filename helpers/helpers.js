import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Hashing failed", error);
  }
};

export const comparePassword = async (password, hashedPass) => {
  try {
    return await bcrypt.compare(password, hashedPass);
  } catch (error) {
    throw new Error("Hashing failed", error);
  }
};

export const generateTokens = (payload) => {
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
    await prisma.token.create({
      data: {
        token,
        user: { connect: { id: userId } },
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
  return await prisma.token.findUnique({
    where: {
      token: refreshToken,
    },
  });
};

export const updateRefreshToken = async (userId, refreshToken) => {
  return await prisma.token.update({
    where: {
      userId: userId,
    },
    data: {
      token: refreshToken,
    },
  });
};

export const removeToken = async (id, refreshToken) => {
  return await prisma.token.deleteMany({
    where: {
      id: id,
      token: refreshToken,
    },
  });
};
