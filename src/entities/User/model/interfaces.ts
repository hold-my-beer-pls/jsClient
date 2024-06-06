export interface Profile {
  email: string;
  id: string;
  name: string | null;
  roles: string[];
}

export interface Tokens {
  refreshToken: string;
  accessToken: string;
}

export interface Authorization {
  email: string;
  password: string;
}

export interface LoginResponse extends Tokens {
  data: Profile;
}
