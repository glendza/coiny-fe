import { anonymusCoinyAxios as axios } from './axios';
import { auth } from '@/types';

const BASE_PATH = '/auth';

export const login = (email: string, password: string) => {
  const payload = { email, password } as auth.LoginRequest;
  return axios.post<auth.LoginResponse>(BASE_PATH + '/token/', payload);
};

export const refresh = (refreshToken: string) => {
  const payload = { refresh: refreshToken } as auth.RefreshRequest;
  return axios.post<auth.RefreshResponse>(BASE_PATH + '/token/refresh/', payload);
};
