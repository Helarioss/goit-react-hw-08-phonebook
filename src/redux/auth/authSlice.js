import { createSlice } from '@reduxjs/toolkit';
import { authApi } from 'services/authApi';

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isAuthenticated = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isAuthenticated = true;
      }
    );
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, () => {
      return initialState;
    });

    builder.addMatcher(
      authApi.endpoints.getCurrentUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
        state.isAuthenticated = true;
        state.isRefreshing = false;
      }
    );
  },
});

export const getEmail = state => state.auth.user.email;
export const getToken = state => state.auth.token;
export const getIsAuthenticated = state => state.auth.isAuthenticated;
