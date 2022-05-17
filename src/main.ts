import { createApp } from 'vue';
import { IonicVue } from '@ionic/vue';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import { createPinia } from 'pinia';

const app = createApp(App)
  .use(router)
  .use(IonicVue)
  .use(createPinia());

router.isReady().then(() => {
  app.mount('#app');
});
