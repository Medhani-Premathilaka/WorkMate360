import type { AxiosInstance } from "axios";
import axios from "axios";

const api: AxiosInstance = axios.create({
  baseURL:  'https://56.228.42.123:8080',
  withCredentials: true
  
});

export default api;