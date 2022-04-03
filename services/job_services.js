import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const getAllJobs = async () => await api.get("/job/get");

export const getJob = async (id) => await api.get(`/job/${id}`);

export const getUserJobs = async (id) =>
  await api.post("/job/userJobs", { userId: id });

export const getUserAppliedJobs = async (id) =>
  await api.post("/job/applied", { id });

export const createJob = async (applyingAs, user, job, companyId) =>
  await api.post("/job/create", { applyingAs, user, job, companyId });

export const deleteJob = async (id, user) =>
  await api.post("/job/delete", { id, user });

export const applyJob = async (jobId, userId) =>
  await api.post("/job/apply", { jobId, userId });

export const saveJob = async (status, jobId, userId) =>
  await api.post("/job/save", { status, jobId, userId });

export default api;
