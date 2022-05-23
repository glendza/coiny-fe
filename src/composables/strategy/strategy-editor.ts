import { ref, onMounted, watch } from 'vue';
import useDebouncer from '@/composables/debouncer';
import useRulesStore from '@/store/rules';

const useStrategyEditor = () => {
  const rulesStore = useRulesStore();

  const rules = ref<string | null>();

  const updateStrategyDraft = useDebouncer(() => {
    rulesStore.saveDraft(rules.value as string);
  }, 2000);

  // Lifecycle hooks
  onMounted(async () => {
    // Once the rules are fetched, we either set the editor to the existing draft,
    // or we just set it to the currently deployed ruleset
    await rulesStore.getUserRuleset();
    rules.value = rulesStore.ruleset?.rules_draft || rulesStore.ruleset?.rules;

    watch(rules, draft => {
      rulesStore.isDraftSaving = true;
      updateStrategyDraft(draft);
    });
  });

  return { rules };
};

export default useStrategyEditor;
