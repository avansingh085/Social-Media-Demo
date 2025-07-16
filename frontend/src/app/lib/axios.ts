import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
});

// ✅ Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    if (typeof window !== 'undefined') {
     const token=await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
