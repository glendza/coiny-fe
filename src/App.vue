<template>
  <router-view/>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import useAuthStore from '@/store/auth';
import useUserStore from './store/user';
import useNotifications from '@/composables/notifications';

// Fetch current user when the user logs in
const authStore = useAuthStore();
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(authStore);

watch(isLoggedIn, (value) => {
  if (value && !userStore.currentUser) {
    userStore.getCurrentUser();
  }
});

onMounted(() => {
  if (isLoggedIn && !userStore.currentUser) {
    userStore.getCurrentUser();
  }
});

useNotifications();
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
