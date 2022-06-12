import axios from './axios';
import { rules } from '@/types';

const BASE_PATH = '/rules';

export const getUserRuleset = async () => {
  const { data: ruleset } = await axios.get<rules.Ruleset>(BASE_PATH);
  return ruleset;
};

export const saveDraft = async (rulesDraft: string | null) => {
  const payload = {
    rules_draft: rulesDraft
  };
  const { data: ruleset } = await axios.patch<rules.Ruleset>(BASE_PATH + '/draft', payload);
  return ruleset;
};

export const deployRules = () => {
  return axios.patch<rules.Ruleset>(BASE_PATH + '/deploy');
};

export const getRuleDocs = async () => {
  const { data: ruleDocs } = await axios.get<rules.RulesDocumentation>(BASE_PATH + '/rule-docs');
  return ruleDocs;
};
