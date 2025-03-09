import axios from "axios";
import { baseUrl } from "./baseUrl";

// Создаём экземпляр Axios
const api = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Включаем отправку `cookies`
});

// Функция для получения `accessToken`
const getAccessToken = () => localStorage.getItem("accessToken");

// Функция для обновления `accessToken`
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${baseUrl}/user/refresh`,
      {},
      { withCredentials: true }
    );

    const newAccessToken = response.data.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("Ошибка обновления токена", error);
    localStorage.removeItem("accessToken");
    window.location.href = "/login"; // Перенаправление на страницу логина
    return null;
  }
};

// Добавляем Interceptor перед отправкой запроса
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    console.log(token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Добавляем Interceptor для обработки 401 (Unauthorized)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Если ошибка 401 (Unauthorized) и токен не обновлялся
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Помечаем, что уже пытались обновить токен

      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Повторяем запрос с новым токеном
      }
    }

    return Promise.reject(error);
  }
);

export default api;
