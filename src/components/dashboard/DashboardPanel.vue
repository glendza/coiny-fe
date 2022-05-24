<template>
<aside class="dashboard-panel p-2 bg-dark border border-5 d-flex flex-column">
  <div class="dashboard-panel__header p-2 text-light mb-2 d-flex justify-content-between">
    <div class="titles" v-if="title">
      <h4 class="m-0">{{ title }}</h4>
      <h6 class="mx-0 mt-1 mb-0 text-muted" v-if="subtitle">{{ subtitle }}</h6>
    </div>
    <slot name="header" />
  </div>
  <slot />
  <div class="dashboard-panel__footer">
    <slot name="footer" />
  </div>
</aside>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  subtitle: String
});
</script>

<style lang="scss" scoped>
.dashboard-panel {
  border-color: var(--bs-body-bg) !important;
}
</style>
