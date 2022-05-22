<template>
  <layout title="Dashboard">
    <div class="row p-2">
      <notification-panel />
      <action-panel />
    </div>
  </layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '@/store/user';
import Layout from '@/components/layout/Layout.vue';
import NotificationPanel from '@/components/NotificationPanel.vue';
import ActionPanel from '@/components/ActionPanel.vue';

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchNotifications(0);
});
</script>
