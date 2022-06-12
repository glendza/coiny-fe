<template>
<div class="d-flex flex-column text-light mb-2 overflow-hidden">
  <div class="bg-dark bg-gradient p-2" @click="toggleExpand">
    <span>{{ title }}</span>
  </div>
  <div :class="{'collapsed': !isExpanded }">
    <slot />
  </div>
</div>
</template>

<script setup lang="ts">
import useToggler from '@/composables/toggler';

defineProps({
  title: String
});

const { isToggledOn: isExpanded, toggle: toggleExpand } = useToggler();
</script>

<style scoped lang="scss">
.collapsed {
  max-height: 0;
}
</style>
