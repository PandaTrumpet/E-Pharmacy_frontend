import axios from "axios";
import { baseUrl } from "./baseUrl";

const api = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const getAccessToken = () => localStorage.getItem("accessToken");

const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${baseUrl}/user/refresh`,
      {},
      { withCredentials: true }
    );

    const newAccessToken = response.data.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
    return newAccessToken;
  } catch (error) {
    console.error("Ошибка обновления токена", error);
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("accessToken");

    return null;
  }
};

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
