import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const createCompany = async (user, company, image) =>
  await api.post("/company/create", { user, company, image });

export const getCompany = async (id) => await api.get(`/company/${id}`);

export const getUserCompany = async (id) =>
  await api.post("/company/userCompany", { userId: id });

export const getUserSavedCompanies = async (id) =>
  await api.post("/company/savedCompanies", { id });

export const getAllCompanies = async () => await api.get("/company/get");

export const saveCompany = async (status, companyId, userId) =>
  await api.post("/company/save", { status, companyId, userId });

export default api;
