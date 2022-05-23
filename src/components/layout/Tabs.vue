<template>
<section class="d-flex flex-column">
  <div class="tabs-header d-flex justify-content-between">
    <ul class="nav nav-tabs">
      <li
        v-for="tab in tabs"
        :key="tab"
        class="nav-item"
      >
        <span
          class="nav-link border-0"
          role="button"
          @click="selectTab(tab)"
          :class="{'bg-secondary active': modelValue === tab}"
        >
          {{ tab }}
        </span>
      </li>
    </ul>
    <div class="d-flex align-items-center">
      <slot name="header" />
    </div>
  </div>
  <div class="tabs-pre">
    <slot name="pre" />
  </div>
  <div class="tabs-content d-flex flex-fill">
    <slot />
  </div>
  <div class="tabs-footer">
    <slot name="footer" />
  </div>
</section>
</template>

<script setup lang="ts">
// Component API
defineProps({
  tabs: Array,
  modelValue: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

// Methods
const selectTab = (tab: string) => {
  console.log(tab);
  emit('update:modelValue', tab);
};
</script>
