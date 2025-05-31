// src/services/api.ts
import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Define types for API responses
type ApiResponse<T = any> = {
  data: T;
  status: number;
  statusText: string;
};

type ApiError = {
  message: string;
  status?: number;
  data?: any;
};

// Create configured axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers = config.headers || {};
      // Type assertion to allow string assignment
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError<{ message?: string }>): Promise<ApiError> => {
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'An unknown error occurred',
      status: error.response?.status,
      data: error.response?.data,
    };

    // Handle specific status codes
    if (error.response?.status === 401) {
      // Unauthorized - token expired or invalid
      localStorage.removeItem('jwtToken');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      // Forbidden - insufficient permissions
      apiError.message = 'You do not have permission to perform this action';
    } else if (error.response?.status === 404) {
      // Not Found
      apiError.message = 'The requested resource was not found';
    } else if (!error.response) {
      // Network error
      apiError.message = 'Network error - please check your connection';
    }

    return Promise.reject(apiError);
  }
);

// Helper functions for common HTTP methods with TypeScript generics
export const getUser = async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  return api.get<T>(url, config);
};

export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  const response = await api.get<T>(url, config);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

export const post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  const response = await api.post<T>(url, data, config);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

export const put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  const response = await api.put<T>(url, data, config);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

export const uploadFile = async <T>(
  url: string,
  file: File,
  fieldName = 'file',
  extraData: Record<string, any> = {}
): Promise<ApiResponse<T>> => {
  const formData = new FormData();
  formData.append(fieldName, file);

  Object.keys(extraData).forEach((key) => {
    formData.append(key, extraData[key]);
  });

  const response = await api.post<T>(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

export default api;