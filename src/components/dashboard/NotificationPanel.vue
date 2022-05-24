<template>
<dashboard-panel title="Notifications">
  <div class="card mb-2" v-for="notification in notifications" :key="notification.id">
    <div class="card-header user-select-none d-flex justify-content-between">
      <span>
        {{ notification.title || 'Notification' }}
      </span>
      <span>
        {{ dateUtils.toLocale(notification.created_at) }}
      </span>
    </div>
    <div class="card-body d-flex flex-column" v-on:keyup.enter="login">
      <p class="card-text">{{ notification.content }}</p>
    </div>
  </div>
  <shruggie v-if="!notifications.length">
    No notifications yet
  </shruggie>
</dashboard-panel>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useUserStore from '@/store/user';
import DashboardPanel from '@/components/dashboard/DashboardPanel.vue';
import { dateUtils } from '@/utils';

const userStore = useUserStore();

const { notifications } = storeToRefs(userStore);
</script>
