import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const getUser = async (id) => await api.get(`/user/${id}`);

export const updateProfile = async (email, name, profile, profileId) =>
  await api.post("/user/updateProfile", { email, name, profile, profileId });

export const updateCv = async (email, cv, cvId) =>
  await api.post("/user/updateCv", { email, cv, cvId });

export const updateUser = async (user) =>
  await api.post("/user/update", { user });

export default api;
