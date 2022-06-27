/* eslint-disable camelcase */

export interface Ruleset {
  deployed_at: string;
  is_enabled: boolean;
  use_global_rules: boolean;
  rules: string | null;
  rules_draft: string | null;
  global_rules: string | null;
}

export enum FunctionType {
  NOTIFICATION = 'notification',
  ACTION = 'action',
  CALCULATION = 'calculation'
}

export enum ArgumentType {
  STRING = 'str',
  INTEGER = 'int',
  FLOAT = 'float',
  DECIMAL = 'decimal',
  BOOLEAN = 'bool',
  DATETIME = 'datetime',
  DATE = 'date'
}

interface FunctionArgumentDocumentation {
  name: string;
  type: ArgumentType | ArgumentType[];
  description: string;
  required: boolean;
  default: boolean | string | number;
}

export interface FunctionDocumentation {
  name: string;
  description: string;
  type: FunctionType;
  arguments: FunctionArgumentDocumentation[];
}

export type RulesDocumentation = Record<string, FunctionDocumentation>
