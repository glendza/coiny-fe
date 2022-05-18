import { createApp, markRaw } from 'vue';
import { IonicVue } from '@ionic/vue';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import { createPinia } from 'pinia';

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

const app = createApp(App)
  .use(router)
  .use(IonicVue)
  .use(pinia);

router.isReady().then(() => {
  app.mount('#app');
});
