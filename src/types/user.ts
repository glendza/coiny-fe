/* eslint-disable camelcase */
export interface User {
  id: number;
  handle?: string;
}

export enum NotificationType {
  MARKET_ALERT = 1
}

export interface Notification {
  id: number;
  created_at: string;
  type: NotificationType;
  title: string | null;
  content: string;
  image: string | null;
}

export enum TransactionType {
  FIAT_TO_CRYPTO = 1,
  CRYPTO_TO_FIAT = 2
}

export interface Transaction {
  id: number;
  created_at: string;
  direction: TransactionType;
  cryptocurrency: string;
  crypto_amount: string;
  fiat_currency: string;
  fiat_amount: string;
}

export interface Balance {
  fiat_balance: number;
  crypto_balance: number;
}
