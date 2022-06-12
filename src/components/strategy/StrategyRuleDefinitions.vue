<template>
<dashboard-panel title="Rule Definitions" class="col-12 col-lg-6">
  <strategy-rule-group title="Calculations" v-if="ruleDocs">
    <strategy-rule-definition
      v-for="[name, documentation] in Object.entries(ruleDocs).filter(([k, v]) => v.type === FunctionType.CALCULATION)"
      :key="name"
      :name="name"
      :documentation="documentation"
    />
  </strategy-rule-group>
  <strategy-rule-group title="Notifications" v-if="ruleDocs">
    <strategy-rule-definition
      v-for="[name, documentation] in Object.entries(ruleDocs).filter(([k, v]) => v.type === FunctionType.NOTIFICATION)"
      :key="name"
      :name="name"
      :documentation="documentation"
    />
  </strategy-rule-group>
  <strategy-rule-group title="Actions" v-if="ruleDocs">
    <strategy-rule-definition
      v-for="[name, documentation] in Object.entries(ruleDocs).filter(([k, v]) => v.type === FunctionType.ACTION)"
      :key="name"
      :name="name"
      :documentation="documentation"
    />
  </strategy-rule-group>
</dashboard-panel>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import DashboardPanel from '@/components/dashboard/DashboardPanel.vue';
import StrategyRuleDefinition from '@/components/strategy/StrategyRuleDefinition.vue';
import StrategyRuleGroup from '@/components/strategy/StrategyRuleGroup.vue';
import { rulesAPI } from '@/api';
import { FunctionType } from '@/types/rules';

const ruleDocs = ref();

onMounted(async () => {
  ruleDocs.value = await rulesAPI.getRuleDocs();
});
</script>
