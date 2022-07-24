import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    signup: builder.mutation({
      query: user => ({
        url: '/users/signup',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    login: builder.mutation({
      query: user => ({
        url: '/users/login',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    getCurrentUser: builder.query({
      query: () => `users/current`,
      providesTags: ['User'],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useLazyGetCurrentUserQuery,
} = authApi;
