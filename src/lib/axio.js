import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SOCKET_URL=== "development" ? "http://localhost:5000/api" : "/api",
  withCredentials: true,
});
