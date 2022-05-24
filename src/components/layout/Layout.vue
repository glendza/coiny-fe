<template>
<coiny-header />
<div class="bg-secondary bg-gradient p-2 text-dark d-flex justify-content-between">
  <div class="layout__title">
    <h4 class="m-0">{{ title }}</h4>
  </div>
  <div class="layout__right">
    <slot name="header" />
  </div>
</div>
<main class="container-fluid d-flex flex-column flex-fill">
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
