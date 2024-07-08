import axios from "axios";
import { getCookie } from "./cookie";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  baseURL: `${process.env.REACT_APP_SERVER_API_URL}`,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("Authorization");
  if (token) {
    config.headers["Authorization"] = `${token}`;
  }
  return config;
});

export default axiosInstance;
