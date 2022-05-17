// Requests

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshRequest {
  refresh: string;
}

// Responses

export interface LoginResponse {
  access: string;
  refresh: string;
}

export type RefreshResponse = Omit<LoginResponse, 'refresh'>;
