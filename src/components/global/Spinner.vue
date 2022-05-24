<template>
<div class="d-flex">
  <span class="text-muted h6 m-0" v-if="pre">{{ pre }}&nbsp;</span>
  <div class="spinner-border spinner-border-sm" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  <span class="text-muted h6 m-0" v-if="post">&nbsp;{{ post }}</span>
  <!-- <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  <div class="spinner-grow spinner-grow-sm" role="status">
    <span class="visually-hidden">Loading...</span>
  </div> -->
</div>
</template>

<script setup lang="ts">
defineProps({
  pre: String,
  post: String
});
</script>
