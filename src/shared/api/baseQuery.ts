import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError, retry } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'api/v1',
  timeout: 60000,
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      return result;
    }

    // try to get a new token
    const refreshResult: any = await baseQuery(
      {
        url: '/refresh',
        method: 'POST',
        headers: { 'user-agent': 'updateToken' },
        body: { refreshToken },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      // store the new token
      localStorage.setItem('refreshToken', refreshResult.data.refreshToken);
      localStorage.setItem('accessToken', refreshResult.data.accessToken);
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.error('Ошибка авторизации');
    }
  }
  return result;
};

export const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 1 });
