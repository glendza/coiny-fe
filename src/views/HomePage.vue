<template>
  <layout title="Dashboard">
    <notification-panel />
  </layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '@/store/user';
import Layout from '@/components/layout/Layout.vue';
import NotificationPanel from '@/components/NotificationPanel.vue';

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchNotifications(0);
});
</script>
