<template>
<dashboard-panel title="Notifications" class="col-12 col-md-6 col-xl-4">
  <card v-for="notification in notifications" :key="notification.id">
    <template #header>
      <div class="d-flex justify-content-between">
        <span>
          {{ notification.title || 'Notification' }}
        </span>
        <span>
          {{ dateUtils.toLocale(notification.created_at) }}
        </span>
      </div>
    </template>
    {{ notification.content }}
  </card>
  <shruggie v-if="!notifications.length">
    No notifications yet
  </shruggie>
</dashboard-panel>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useUserStore from '@/store/user';
import DashboardPanel from '@/components/dashboard/DashboardPanel.vue';
import Card from '@/components/layout/Card.vue';
import { dateUtils } from '@/utils';

const userStore = useUserStore();

const { notifications } = storeToRefs(userStore);
</script>
