<template>
<div v-if="ruleset" class="flex-fill p-1">
  <textarea
    v-if="ruleset?.use_global_rules"
    :disabled="true"
    class="editor-textarea p-2 text-dark"
    :value="ruleset.global_rules || ''"
  />
  <textarea
    v-if="!ruleset?.use_global_rules && rules !== null"
    class="editor-textarea p-2 text-dark"
    v-model="rules"
  />
</div>
</template>

<script setup lang="ts">
import useStrategyEditor from '@/composables/strategy/strategy-editor';

const { rules, ruleset } = useStrategyEditor();
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
