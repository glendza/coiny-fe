import axios from './axios';
import { user, PaginatedResponse } from '@/types';

const BASE_PATH = '/user';

export const getCurrentUser = () => {
  return axios.get<user.User>(BASE_PATH + '/current-user/');
};

export const getNotifications = (limit: number, offset: number) => {
  return axios.get<PaginatedResponse<user.Notification>>(
    BASE_PATH + '/notifications', {
      params: { limit, offset }
    }
  );
};

export const getTransactions = (limit: number, offset: number) => {
  return axios.get<PaginatedResponse<user.Transaction>>(
    BASE_PATH + '/transactions', {
      params: { limit, offset }
    }
  );
};

export const getBalance = () => {
  return axios.get<user.Balance>(BASE_PATH + '/balance');
};
