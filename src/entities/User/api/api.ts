import { baseApi } from '@/shared/api';
import { Authorization, LoginResponse, Profile } from '../model/interfaces.ts';

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
    registration: build.mutation<LoginResponse, Authorization>({
      query: (loginData) => ({
        url: '/registration',
        method: 'POST',
        body: loginData,
      }),
    }),
  }),
});

export const { useGetMyProfileQuery, useLoginMutation, useLazyGetMyProfileQuery } = userApi;
