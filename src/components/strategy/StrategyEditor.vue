<template>
  <dashboard-panel title="Strategy Editor" class="col-12 col-md-6">
    <template #header>
      <span class="text-muted" v-if="ruleset?.deployed_at">
        {{ deployedAt }}
      </span>
    </template>
    <strategy-text-editor />
    <template #footer>
      <div class="p-1 d-flex justify-content-between">
        <div class="d-flex align-items-center">
          <spinner
            post="Saving draft..."
            v-if="isDraftSaving"
          />
        </div>
        <button
          type="button"
          class="btn btn-primary"
          :class="{'disabled': isDraftSaving}"
          @click="rulesStore.deployRules"
        >
          Deploy Rules
        </button>
      </div>
    </template>
  </dashboard-panel>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import DashboardPanel from '@/components/dashboard/DashboardPanel.vue';
import useRulesStore from '@/store/rules';
import { storeToRefs } from 'pinia';
import StrategyTextEditor from '@/components/strategy/StrategyTextEditor.vue';
import { dateUtils } from '@/utils';

const rulesStore = useRulesStore();
const { ruleset, isDraftSaving } = storeToRefs(rulesStore);

const deployedAt = computed(() => {
  if (!rulesStore.ruleset) {
    return '';
  }
  return `Last deployed on ${dateUtils.toLocale(rulesStore.ruleset.deployed_at)}`;
});
</script>

<style lang="scss" scoped>
</style>
