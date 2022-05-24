import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import useDebouncer from '@/composables/debouncer';
import useRulesStore from '@/store/rules';

const useStrategyEditor = () => {
  const rulesStore = useRulesStore();

  const { ruleset, isDraftSaving, useGlobalRules } = storeToRefs(rulesStore);

  const rules = ref<string | null>();

  const updateStrategyDraft = useDebouncer(() => {
    rulesStore.saveDraft(rules.value as string);
  }, 2000);

  watch(ruleset, (newRuleset) => {
    // Once the rules are fetched, we either set the editor to the existing draft,
    // or we just set it to the currently deployed ruleset
    if (!ruleset || rules.value === newRuleset?.rules_draft) {
      return;
    }

    rules.value = newRuleset?.rules_draft || newRuleset?.rules;

    watch(rules, () => {
      isDraftSaving.value = true;
      updateStrategyDraft();
    });
  });

  return { rules, useGlobalRules };
};

export default useStrategyEditor;
