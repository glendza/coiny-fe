import { defineStore } from 'pinia';
import { authAPI } from '@/api';

interface AuthState {
  loading: boolean;
  loginFailed: boolean;
}

const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false,
    loginFailed: false
  } as AuthState),
  getters: {},
  actions: {
    async login(email: string, password: string) {
      this.loading = true;
      try {
        const tokenPair = await authAPI.login(email, password);
        localStorage.setItem('access_token', tokenPair.access);
        localStorage.setItem('refresh_token', tokenPair.refresh);
        this.loginFailed = false;
      } catch (e) {
        console.error('Failed to obtain token!', e);
        this.loginFailed = true;
      }
      this.loading = false;
    }
  }
});

export default useAuthStore;
