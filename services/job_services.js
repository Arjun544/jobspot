import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const getAllJobs = async () => await api.get("/job/get");

export const createJob = async (applyingAs, user, job, companyId) =>
  await api.post("/job/create", { applyingAs, user, job, companyId });

export default api;
