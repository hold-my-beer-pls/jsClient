import { baseApi } from '@/shared/api';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyProfile: build.query<unknown, void>({
      query: () => ({
        url: '/me',
      }),
    }),
  }),
});

export const { useGetMyProfileQuery } = profileApi;
