<template>
  <layout title="Dashboard">
    <div class="row p-2">
      <BudgetPanel />
      <NotificationPanel />
      <ActionPanel />
    </div>
  </layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '@/store/user';
import Layout from '@/components/layout/Layout.vue';
import BudgetPanel from '@/components/dashboard/BudgetPanel.vue';
import NotificationPanel from '@/components/dashboard/NotificationPanel.vue';
import ActionPanel from '@/components/dashboard/ActionPanel.vue';

const userStore = useUserStore();

onMounted(() => {
  // TODO: Pagination
  userStore.fetchNotifications(0);
  userStore.fetchTransactions(0);
  userStore.fetchBalance();
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
