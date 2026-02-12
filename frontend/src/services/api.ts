import axios, { AxiosInstance, AxiosError } from 'axios';
import type { ApiError } from '@app-types/index';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${API_URL}/api`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiError>) => {
        if (error.response?.status === 401) {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            try {
              const response = await this.client.post('/auth/refresh', {
                refreshToken,
              });
              const { token } = response.data;
              localStorage.setItem('token', token);
              
              if (error.config) {
                error.config.headers.Authorization = `Bearer ${token}`;
                return this.client.request(error.config);
              }
            } catch (refreshError) {
              localStorage.removeItem('token');
              localStorage.removeItem('refreshToken');
              window.location.href = '/login';
            }
          } else {
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  getInstance(): AxiosInstance {
    return this.client;
  }
}

export const apiClient = new ApiClient().getInstance();
export default apiClient;
