import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import useAuthStore from '@/store/auth';
import useUserStore from '@/store/user';
import { COINY_BASE_WS_URL } from '@/environment';
import { user } from '@/types';

const useNotifications = () => {
  const authStore = useAuthStore();
  const userStore = useUserStore();
  let ws: WebSocket | null = null;

  const { isLoggedIn } = storeToRefs(authStore);

  const openWS = (jwt: string) => {
    if (ws) {
      console.log('Coiny WS already connected.');
      return;
    }

    const url = new URL(COINY_BASE_WS_URL + '/user/notifications');
    url.searchParams.set('token', jwt);
    ws = new WebSocket(url);

    // Register callbacks
    ws.onopen = () => {
      console.log('Coiny WS connected successfully.');
    };

    ws.onclose = () => {
      setTimeout(() => openWS(jwt), 3000);
      ws = null;
      console.log('Coiny WS closed. Attempting reconnect in 3 seconds...');
    };

    ws.onerror = () => {
      console.log('Error occured with coiny WS.');
    };

    ws.onmessage = e => {
      const notification = <user.Notification>JSON.parse(e.data);
      console.log('Message received: ', notification);
      userStore.appendNotification(notification);
    };
  };

  watch(isLoggedIn, value => {
    // When the user logs in/out the WebSocket should open/close
    if (value) {
      console.log('User logged in - opening the WS.');
      openWS(authStore.accessToken as string);
    } else {
      console.log('User logged out - closing the WS');
      ws?.close();
      ws = null;
    }
  });

  onMounted(() => {
    // Check the auth state, and open the socket if the user is logged in
    if (authStore.isLoggedIn) {
      openWS(authStore.accessToken as string);
    }
  });
};

export default useNotifications;
