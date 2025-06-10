import type { AxiosInstance } from "axios";
import axios from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://0157-56-228-42-123.ngrok-free.app",
  withCredentials: false,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true"
  },
});

export default api;
