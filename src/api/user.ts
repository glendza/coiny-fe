import axios from './axios';
import { user } from '@/types';

const BASE_PATH = '/user';

export const getCurrentUser = () => {
  return axios.get<user.User>(BASE_PATH + '/current-user/');
};
