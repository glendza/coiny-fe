<template>
<coiny-header />
<div class="bg-secondary bg-gradient p-2 text-dark">
  <h4 class="m-0">{{ title }}</h4>
</div>
<main class="flex-grow-1 container-fluid">
  <slot>😐</slot>
</main>
<coiny-footer />
</template>

<script setup lang="ts">
import CoinyHeader from './Header.vue';
import CoinyFooter from './Footer.vue';

defineProps({
  title: String
});
</script>
