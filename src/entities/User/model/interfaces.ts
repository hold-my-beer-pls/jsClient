export const enum Roles {
  admin = 'ADMIN',
  user = 'USER',
}

export interface Profile {
  id: string;
  email: string | null;
  name: string | null;
  tgId: number | null;
  roles: Roles[];
}

export interface Tokens {
  refreshToken: string;
  accessToken: string;
}

export interface Authorization {
  email: string;
  password: string;
}

export interface AuthorizationWithTg {
  initData: string;
}

export interface LoginResponse extends Tokens {
  data: Profile;
}

export interface PaginationRequest {
  page: number;
  limit: number;
}

export interface RoleRequest {
  role: Roles;
  userId: string;
}
