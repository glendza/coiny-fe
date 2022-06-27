<template>
  <layout title="Dashboard">
    <div class="row p-2">
      <notification-panel />
      <action-panel />
    </div>
    <template #header>
      <span class="dashboard__total_balance fw-bold h5 m-0">Total balance: 20 $</span>
    </template>
  </layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '@/store/user';
import Layout from '@/components/layout/Layout.vue';
import NotificationPanel from '@/components/dashboard/NotificationPanel.vue';
import ActionPanel from '@/components/dashboard/ActionPanel.vue';

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchNotifications(0);
});
</script>

<style lang="scss" scoped>
.dashboard {
  &__total_balance {
    position: relative;
    top: 3px;
  }
}
</style>
