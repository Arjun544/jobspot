import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
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

export const gmailSignin = async (name, email, profile) =>
  await api.post("/auth/gmail", { name, email, profile });

export const logout = async (id) => await api.post("/auth/logout", { id });

// Interceptor for refresh token
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        await axios.get(`/auth/refresh`, {
          withCredentials: true,
        });

        return api.request(originalRequest);
      } catch (err) {
        console.log(err.message);
      }
    }
    throw error;
  }
);

export default api;
