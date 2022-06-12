import { defineStore } from 'pinia';
import { rules } from '@/types';
import { rulesAPI } from '@/api';

interface RulesState {
  loading: boolean;
  isDraftSaving: boolean;
  ruleset: rules.Ruleset | null;
}

const useRulesStore = defineStore('rules', {
  state: () => ({
    loading: false,
    isDraftSaving: false,
    ruleset: null
  } as RulesState),
  getters: {
    isDraft: state => state.ruleset?.rules !== state.ruleset?.rules_draft
  },
  actions: {
    async getUserRuleset() {
      this.loading = true;
      try {
        this.ruleset = await rulesAPI.getUserRuleset();
      } catch (e) {
        console.error('Failed to fetch user\'s ruleset!', e);
      }
      this.loading = false;
    },
    async saveDraft(draft: string | null) {
      try {
        this.ruleset = await rulesAPI.saveDraft(draft);
      } catch (e) {
        console.error('Failed to fetch user\'s ruleset!', e);
      }
      this.isDraftSaving = false;
    },
    async resetDraft() {
      this.loading = true;
      try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await this.saveDraft(this.ruleset!.rules);
      } catch (e) {
        console.error('Failed to reset ruleset draft!', e);
      }
      this.loading = false;
    },
    async deployRules() {
      this.loading = true;
      try {
        const { data: ruleset } = await rulesAPI.deployRules();
        this.ruleset = ruleset;
      } catch (e) {
        console.error('Failed to reset ruleset draft!', e);
      }
      this.loading = false;
    },
    async toggleGlobalRulesUsage(value: boolean) {
      this.loading = true;
      try {
        this.ruleset = await rulesAPI.toggleGlobalRules(value);
      } catch (e) {
        console.error('Failed to toggle global ruleset usage!', e);
      }
      this.loading = false;
    }
  }
});

export default useRulesStore;
