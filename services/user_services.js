import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const register = async (name, email, password) =>
  await api.post("/auth/register", {name, email, password });

export const login = async (email, password) =>
  await api.post("/auth/login", { email, password });
