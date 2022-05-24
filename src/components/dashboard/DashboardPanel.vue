<template>
<aside class="dashboard-panel p-2 bg-dark border border-5">
  <div class="p-2 text-light mb-2" v-if="title">
    <h4 class="m-0">{{ title }}</h4>
  </div>
  <slot />
</aside>
</template>

<script setup lang="ts">
defineProps({
  title: String
});
</script>

<style lang="scss" scoped>
.dashboard-panel {
  border-color: var(--bs-body-bg) !important;
}
</style>
