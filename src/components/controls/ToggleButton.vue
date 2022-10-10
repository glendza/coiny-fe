<template>
<div
  class="toggle-button btn btn-primary rounded-pill p-1 d-flex align-items-center"
  :class="{
    'btn-primary': modelValue,
    'btn-danger': !modelValue,
    'justify-content-end': modelValue
  }"
  @click="emit('update:modelValue', !modelValue)"
  :aria-pressed="modelValue"
>
  <div
    class="toggle-button__slider user-select-none rounded-circle bg-dark position-relative"
  ></div>
</div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
.toggle-button {
  height: 2rem;
  width: 3.5rem;
}
.toggle-button__slider {
  height: 1.5rem;
  width: 1.5rem;
}
</style>
