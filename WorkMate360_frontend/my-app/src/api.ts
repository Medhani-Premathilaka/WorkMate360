import type { AxiosInstance } from "axios";
import axios from "axios";

const api: AxiosInstance = axios.create({
  baseURL:  'https://fe13-56-228-42-123.ngrok-free.app',
  withCredentials: true
  
});

export default api;