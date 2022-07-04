<template>
  <dashboard-panel
    title="Strategy Editor"
    :subtitle="useGlobalRules ? '' : deployedAt"
    class="col-12 col-lg-6"
  >
    <template #header>
      <div class="d-flex align-items-center">
        <toggle-button v-model="useGlobalRules" />
      </div>
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
          :class="{'disabled': isDraftSaving || useGlobalRules}"
          @click="rulesStore.deployRules"
        >
          Deploy Rules
        </button>
      </div>
    </template>
  </dashboard-panel>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import DashboardPanel from '@/components/dashboard/DashboardPanel.vue';
import StrategyTextEditor from '@/components/strategy/StrategyTextEditor.vue';
import ToggleButton from '@/components/controls/ToggleButton.vue';
import useRulesStore from '@/store/rules';
import { storeToRefs } from 'pinia';
import { dateUtils } from '@/utils';
import useDebouncer from '@/composables/debouncer';

const rulesStore = useRulesStore();

const { ruleset, isDraftSaving } = storeToRefs(rulesStore);

const useGlobalRules = ref<boolean>();

const debouncedUpdateGlobalRules = useDebouncer(() => {
  // TODO: Prevent updating if value is same as before
  rulesStore.toggleGlobalRulesUsage(useGlobalRules.value as boolean);
});

watch(useGlobalRules, (newValue, oldValue) => {
  if (typeof oldValue === 'undefined') {
    return;
  }
  debouncedUpdateGlobalRules();
});

watch(ruleset, (value) => {
  if (value && typeof useGlobalRules.value === 'undefined') {
    useGlobalRules.value = ruleset.value?.use_global_rules;
  }
});

const deployedAt = computed(() => {
  if (!rulesStore.ruleset) {
    return '';
  }
  return `Last deployed on ${dateUtils.toLocale(rulesStore.ruleset.deployed_at)}`;
});
</script>
