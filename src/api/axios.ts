import axios, { Axios, AxiosError } from 'axios';
import { COINY_BASE_API_URL } from '@/environment';

const coinyAxios = axios.create({
  baseURL: COINY_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

coinyAxios.interceptors.request.use(
  config => {
    // TODO: Append tokens
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axios.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    if (status === 401) {
      // TODO: Handle unauthenticated
    }
    if (status === 403) {
      // TODO: Handle unauthorized
    }
    // TODO: Handle all the other requests with snack
    return Promise.reject(error);
  }
);

export default coinyAxios;
