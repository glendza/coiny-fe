import { defineStore } from 'pinia';
import { authAPI } from '@/api';
import { Router } from 'vue-router';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

interface AuthState {
  router: Router;
  loading: boolean;
  loginFailed: boolean;
}

const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false,
    loginFailed: false
  } as AuthState),
  getters: {
    accessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY)
  },
  actions: {
    async login(email: string, password: string) {
      this.loading = true;
      try {
        const { data: tokenPair } = await authAPI.login(email, password);
        localStorage.setItem(ACCESS_TOKEN_KEY, tokenPair.access);
        localStorage.setItem(REFRESH_TOKEN_KEY, tokenPair.refresh);
        this.loginFailed = false;
        this.router.push({ name: 'home' });
      } catch (e) {
        console.error('Failed to obtain tokens!', e);
        this.loginFailed = true;
      }
      this.loading = false;
    },
    async refresh() {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!refreshToken) {
        this.logout();
        return;
      }
      try {
        const { data } = await authAPI.refresh(refreshToken);
        localStorage.setItem(ACCESS_TOKEN_KEY, data.access);
      } catch (e) {
        console.error('Failed to refresh token!', e);
        this.logout();
      }
    },
    logout() {
      // First we remove the tokens
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      // Then we redireect to login page
      this.router.push({ name: 'login' });
    }
  }
});

export default useAuthStore;
