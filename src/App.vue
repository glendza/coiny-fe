<template>
  <router-view/>
</template>

<script setup lang="ts">
import useServiceWorker from '@/composables/shared-worker';

useServiceWorker();
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
