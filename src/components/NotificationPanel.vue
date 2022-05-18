<template>
<aside>
  <div class="notification card mb-2" v-for="notification in notifications" :key="notification.id">
    <div class="card-header user-select-none d-flex justify-content-between">
      <span>
        {{ notification.title || 'Notification' }}
      </span>
      <span>
        <!-- <i class="bi bi-x-square-fill h5"></i> -->
      </span>
    </div>
    <div class="card-body d-flex flex-column" v-on:keyup.enter="login">
      <p class="card-text">{{ notification.content }}</p>
    </div>
  </div>
</aside>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useUserStore from '@/store/user';

const userStore = useUserStore();

const { notifications } = storeToRefs(userStore);
</script>

<style lang="scss" scoped>
.notification {
  width: 400px;
  height: 100px;
}
</style>
