<template>
<div class="d-flex flex-column mb-2 overflow-hidden">
  <div class="bg-dark bg-gradient p-2">
    <span class="text-light fw-bold">{{ title }}</span>
  </div>
  <slot />
</div>
</template>

<script setup lang="ts">
defineProps({
  title: String
});
</script>
