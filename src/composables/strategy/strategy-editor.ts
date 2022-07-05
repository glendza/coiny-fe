import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import useDebouncer from '@/composables/debouncer';
import useRulesStore from '@/store/rules';

const useStrategyEditor = () => {
  const rulesStore = useRulesStore();

  const { ruleset, isDraftSaving } = storeToRefs(rulesStore);

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

    rules.value = newRuleset?.rules_draft === null ? newRuleset.rules : newRuleset?.rules_draft;

    watch(rules, () => {
      isDraftSaving.value = true;
      updateStrategyDraft();
    });
  });

  return { rules, ruleset };
};

export default useStrategyEditor;
