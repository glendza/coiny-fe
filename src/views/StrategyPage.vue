<template>
  <layout></layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/components/layout/Layout.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    Layout
  }
});
</script>
