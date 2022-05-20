import { defineStore } from 'pinia';
import { user } from '@/types';
import { userAPI } from '@/api';

interface AuthState {
  loading: boolean;
  currentUser: user.User | null;
  notifications: user.Notification[];
}

const useUserStore = defineStore('user', {
  state: () => ({
    loading: false,
    currentUser: null,
    notifications: []
  } as AuthState),
  getters: { },
  actions: {
    async getCurrentUser() {
      try {
        const { data: currentUser } = await userAPI.getCurrentUser();
        this.currentUser = currentUser;
      } catch (e) {
        console.error('Failed to fetch current user!', e);
      }
    }
  }
});

export default useUserStore;
