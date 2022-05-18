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
