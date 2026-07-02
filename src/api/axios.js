import axios from "axios";

const api = axios.create({
  baseURL: "https://yacam-backend.onrender.com/api", // ✅ URL de production (pas localhost)
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;