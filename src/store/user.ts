import { defineStore } from 'pinia';
import { user } from '@/types';
import { userAPI } from '@/api';

const NOTIFICATIONS_PER_PAGE = 20;

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
  actions: {
    async getCurrentUser() {
      try {
        const { data: currentUser } = await userAPI.getCurrentUser();
        this.currentUser = currentUser;
      } catch (e) {
        console.error('Failed to fetch current user!', e);
      }
    },
    async fetchNotifications(offset: number, limit = NOTIFICATIONS_PER_PAGE) {
      try {
        const { data: notifications } = await userAPI.getNotifications(limit, offset);
        this.notifications = notifications.results;
      } catch (e) {
        console.error('Failed to fetch user notifications!', e);
      }
    },
    appendNotification(notification: user.Notification) {
      const notifications = [notification, ...this.notifications];
      notifications.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      this.notifications = notifications.slice(0, NOTIFICATIONS_PER_PAGE);
    }
  }
});

export default useUserStore;
