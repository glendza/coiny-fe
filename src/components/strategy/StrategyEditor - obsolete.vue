<template>
  <aside class="strategy-panel col d-flex bg-dark border border-5">
    <tabs
      v-model="selectedTab"
      :tabs="Object.values(EditorTabs)"
      class="flex-fill"
    >
      <template v-if="rulesStore.isDraftSaving" #header>
        <spinner pre="Saving draft..." />
      </template>
      <strategy-gui-editor v-if="selectedTab === EditorTabs.GUI" />
      <strategy-text-editor v-if="selectedTab === EditorTabs.TEXT" />
      <template #footer>
        <div class="p-2 d-flex justify-content-end">
          <button
            type="button"
            class="btn btn-primary"
            :class="{'disabled': rulesStore.isDraftSaving}"
            @click="rulesStore.deployRules"
          >
            Deploy Rules
          </button>
        </div>
      </template>
    </tabs>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Tabs from '@/components/layout/Tabs.vue';
import StrategyGuiEditor from '@/components/strategy/StrategyGuiEditor.vue';
import StrategyTextEditor from '@/components/strategy/StrategyTextEditor.vue';
import useRulesStore from '@/store/rules';

enum EditorTabs {
  GUI = 'Visual Editor',
  TEXT = 'Raw Editor'
}

const rulesStore = useRulesStore();

// Data
const selectedTab = ref<EditorTabs>(EditorTabs.TEXT); // TODO: GUI should be default
</script>

<style lang="scss" scoped>
.strategy-panel {
  border-color: var(--bs-body-bg) !important;
}
</style>
