<template>
<aside class="dashboard-panel col-12 col-md-6 col-xl-4 p-2 bg-dark border border-5">
  <div class="p-2 text-light mb-2">
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
