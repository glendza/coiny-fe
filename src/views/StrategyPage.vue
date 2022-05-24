<template>
  <layout title="Strategy">
    <div class="row p-2 flex-fill">
      <strategy-editor />
      <strategy-rule-definitions />
    </div>
  </layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Layout from '@/components/layout/Layout.vue';
import StrategyEditor from '@/components/strategy/StrategyEditor.vue';
import StrategyRuleDefinitions from '@/components/strategy/StrategyRuleDefinitions.vue';
import useRulesStore from '@/store/rules';

const rulesStore = useRulesStore();

onMounted(async () => {
  await rulesStore.getUserRuleset();
});
</script>
