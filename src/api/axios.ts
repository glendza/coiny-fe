import axios, { AxiosError, AxiosRequestConfig as BaseAxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { COINY_BASE_API_URL } from '@/environment';
import useAuthStore from '@/store/auth';

interface AxiosRequestConfig extends BaseAxiosRequestConfig {
  isRetry: boolean;
}

const coinyAxios = axios.create({
  baseURL: COINY_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const anonymusCoinyAxios = axios.create({
  baseURL: COINY_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

coinyAxios.interceptors.request.use(
  config => {
    // const authStore = useAuthStore();
    // XXX Would be better using authStore
    (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

coinyAxios.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const config = error.config as AxiosRequestConfig;

    if (status === 401) {
      const authStore = useAuthStore();
      if (config.isRetry) {
        authStore.logout();
      } else {
        await authStore.refresh();
        config.isRetry = true;
        return coinyAxios(config);
      }
    }

    return Promise.reject(error);
  }
);

export default coinyAxios;
