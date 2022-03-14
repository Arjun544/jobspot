import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const updateUser = async (user) =>
  await api.post("/user/update", { user });

export const createCompany = async (user, company) =>
  await api.post("/user/createCompany", { user, company });

export default api;
