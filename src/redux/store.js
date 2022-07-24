import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { contactsApi } from 'services/contactsApi';
import { authApi } from 'services/authApi';
import { authSlice } from './auth/authSlice';
import { filterSlice } from './contacts/filterSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    auth: persistReducer(authPersistConfig, authSlice.reducer),
    filter: filterSlice.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    authApi.middleware,
    contactsApi.middleware,
  ],
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
