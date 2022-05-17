import { createApp } from 'vue';
import { IonicVue } from '@ionic/vue';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';

const app = createApp(App)
  .use(router)
  .use(IonicVue);

router.isReady().then(() => {
  app.mount('#app');
});
