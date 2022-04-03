import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const addComment = async (userId, comment, companyId, jobId) =>
  await api.post("/comment/add", { userId, comment, companyId, jobId });

export default api;
