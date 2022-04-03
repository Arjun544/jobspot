import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const register = async (name, email, password) =>
  await api.post("/auth/register", { name, email, password });

export const login = async (email, password) =>
  await api.post("/auth/login", { email, password });

export const gmailSignup = async (name, email, profile) =>
  await api.post("/auth/gmailSignup", { name, email, profile });

export const gmailLogin = async (email) =>
  await api.post("/auth/gmailLogin", { email });

export const logout = async (id) => await api.post("/auth/logout", { id });

export default api;
