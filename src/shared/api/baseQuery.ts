import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  timeout: 60000,
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});

// const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
//   args,
//   api,
//   extraOptions,
// ) => {
//   let result = await baseQuery(args, api, extraOptions);
//
//   if (result.error && result.error.status === 401) {
//     const { refreshToken } = (api.getState() as RootState).authReducer;
//     const { addTokens, setHasProfile } = authSlice.actions;
//
//     if (!refreshToken) {
//       return result;
//     }
//
//     // try to get a new token
//     const refreshResult = await baseQuery(
//       {
//         url: '/auth',
//         method: 'PUT',
//         headers: { 'user-agent': 'updateToken' },
//         body: { refresh_token: refreshToken },
//       },
//       api,
//       extraOptions,
//     );
//
//     if (refreshResult.data) {
//       // store the new token
//       api.dispatch(addTokens(refreshResult.data as TokensI));
//       // retry the initial query
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(setHasProfile(null));
//       api.dispatch(addTokens({ refresh_token: '', access_token: '' }));
//     }
//   }
//   return result;
// };

// export const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 1 });
