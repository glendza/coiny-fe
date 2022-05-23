import axios from './axios';
import { rules } from '@/types';

const BASE_PATH = '/rules';

export const getUserRuleset = () => {
  return axios.get<rules.Ruleset>(BASE_PATH);
};

export const saveDraft = (rulesDraft: string | null) => {
  const payload = {
    rules_draft: rulesDraft
  };
  return axios.patch<rules.Ruleset>(BASE_PATH + '/draft', payload);
};

export const deployRules = () => {
  return axios.patch<rules.Ruleset>(BASE_PATH + '/deploy');
};
