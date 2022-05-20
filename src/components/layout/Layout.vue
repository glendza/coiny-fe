<template>
<coiny-header />
<main class="flex-grow-1 container-fluid p-2">
  <slot>😐</slot>
</main>
<coiny-footer />
</template>

<script setup lang="ts">
import CoinyHeader from './Header.vue';
import CoinyFooter from './Footer.vue';
</script>
