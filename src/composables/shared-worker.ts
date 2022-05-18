import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import useAuthStore from '@/store/auth';
import useUserStore from '@/store/user';
import { COINY_BASE_WS_URL } from '@/environment';

interface WorkerCommand {
  command: 'close' | 'connect' | 'disconnect',
  data?: unknown;
}

interface WorkerMessage {
  type: 'log' | 'notification';
  payload?: unknown;
}

// Create the shared worker
const worker = new SharedWorker(`${process.env.BASE_URL}js/shared-worker.js`);
worker.port.start();

const sendMessage = (message: WorkerCommand): void => {
  worker.port.postMessage(message);
};

const useServiceWorker = () => {
  const authStore = useAuthStore();
  const userStore = useUserStore();

  const { isLoggedIn } = storeToRefs(authStore);

  const connect = () => {
    sendMessage({
      command: 'connect',
      data: {
        baseURL: COINY_BASE_WS_URL,
        jwt: authStore.accessToken
      }
    });
  };

  watch(isLoggedIn, value => {
    // When the user logs in/out the shared worker should connect/disconnect
    if (value) {
      connect();
    } else {
      sendMessage({ command: 'disconnect' });
    }
  });

  onMounted(() => {
    // Check the auth state, and notify the shared user to connect if the user is logged in
    if (authStore.isLoggedIn) {
      connect();
    }

    worker.port.addEventListener('message', (e) => {
      const message = e.data as WorkerMessage;

      switch (message.type) {
        case 'log': {
          console.log(message.payload);
          break;
        }
        case 'notification': {
          userStore.notifications.push(JSON.parse(e.data.payload));
          break;
        }
      }
    });

    worker.port.addEventListener('messageerror', e => {
      console.error('An error occured in shared worker: ', e.data);
    });

    addEventListener('beforeunload', () => {
      // We need to deregister the window/tab once it's closed
      sendMessage({ command: 'close' });
    });
  });
};

export default useServiceWorker;
