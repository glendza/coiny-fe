import axios from './axios';
import { auth } from '@/types';

const BASE_PATH = '/auth';

export const login = (email: string, password: string): Promise<auth.LoginResponse> => {
  const payload = { email, password } as auth.LoginRequest;
  return axios.post(BASE_PATH + '/token/', payload);
};

export const refresh = (refreshToken: string): Promise<auth.RefreshResponse> => {
  return axios.post(BASE_PATH + '/token/refresh/', { refresh: refreshToken } as auth.RefreshRequest);
};
