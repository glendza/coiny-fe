import { defineStore } from 'pinia';
import { user } from '@/types';
import { userAPI } from '@/api';

const NOTIFICATIONS_PER_PAGE = 10;

interface UserState {
  loading: boolean;
  currentUser: user.User | null;
  // TODO: Move to a separate store everything notification related!
  notifications: user.Notification[];
  transactions: user.Transaction[];
  balance: user.Balance | null;
}

const useUserStore = defineStore('user', {
  state: () => ({
    loading: false,
    currentUser: null,
    notifications: [],
    transactions: [],
    balance: null
  } as UserState),
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
    },
    async fetchTransactions(offset: number, limit = NOTIFICATIONS_PER_PAGE) {
      try {
        const { data: transactions } = await userAPI.getTransactions(limit, offset);
        this.transactions = transactions.results;
      } catch (e) {
        console.error('Failed to fetch user transactions!');
      }
    },
    appendTransaction(transaction: user.Transaction) {
      const transactions = [transaction, ...this.transactions];
      transactions.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      this.transactions = transactions.slice(0, NOTIFICATIONS_PER_PAGE);
    },
    async fetchBalance() {
      try {
        const { data: balance } = await userAPI.getBalance();
        this.balance = balance;
      } catch (e) {
        console.error('Failed to fetch user balance!', e);
      }
    }
  }
});

export default useUserStore;
