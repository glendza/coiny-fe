<template>
  <layout title="Dashboard">
    <notification-panel />
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/components/layout/Layout.vue';
import NotificationPanel from '@/components/NotificationPanel.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    Layout,
    NotificationPanel
  }
});
</script>
