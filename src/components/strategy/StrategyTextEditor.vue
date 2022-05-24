<template>
  <div class="flex-fill p-1">
    <textarea class="editor-textarea p-2" v-model="rules" />
  </div>
</template>

<script setup lang="ts">
import useStrategyEditor from '@/composables/strategy/strategy-editor';

const { rules } = useStrategyEditor();
</script>

<style lang="scss" scoped>
.editor-textarea {
  width: 100%;
  height: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  resize: none;
}
</style>
