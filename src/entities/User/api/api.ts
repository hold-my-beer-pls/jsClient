import { baseApi } from '@/shared/api';
import {
  Authorization,
  AuthorizationWithTg,
  LoginResponse,
  PaginationRequest,
  Profile,
  RoleRequest,
} from '../model/interfaces.ts';
import { PaginationResponse } from '@/shared/interfaces';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyProfile: build.query<Profile, void>({
      query: () => ({
        url: '/me',
      }),
    }),
    login: build.mutation<LoginResponse, Authorization>({
      query: (loginData) => ({
        url: '/login',
        method: 'POST',
        body: loginData,
      }),
      transformResponse: (response: LoginResponse) => {
        const { accessToken, refreshToken } = response;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return response;
      },
    }),
    loginWithTg: build.mutation<LoginResponse, AuthorizationWithTg>({
      query: (loginData) => ({
        url: '/loginWithTg',
        method: 'POST',
        body: loginData,
      }),
      transformResponse: (response: LoginResponse) => {
        const { accessToken, refreshToken } = response;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return response;
      },
    }),
    registration: build.mutation<LoginResponse, Authorization>({
      query: (loginData) => ({
        url: '/registration',
        method: 'POST',
        body: loginData,
      }),
    }),
    logout: build.query<void, void>({
      query: () => ({
        url: '/logout',
      }),
    }),
    getAll: build.query<PaginationResponse<Profile>, PaginationRequest>({
      query: (params) => ({
        url: '/users',
        params,
      }),
    }),
    setRole: build.mutation<void, RoleRequest>({
      query: ({ userId, role }) => ({
        url: `/users/${userId}`,
        method: 'PATCH',
        body: { role },
      }),
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useLoginWithTgMutation,
  useRegistrationMutation,
  useLoginMutation,
  useLazyLogoutQuery,
  useGetAllQuery,
  useSetRoleMutation,
} = userApi;
