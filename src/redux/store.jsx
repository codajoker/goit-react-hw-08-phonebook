// После
import { configureStore } from '@reduxjs/toolkit';
import { itemSlice, authSlice } from './redux-redesers';
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
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfigItem = {
  key: 'item',
  storage,
};
const persistedReducerItem = persistReducer(
  persistConfigItem,
  itemSlice.reducer
);
const persistConfiAuth = {
  key: 'auth',
  storage,
  whitlist: ['token'],
};
const persistedReducerAuth = persistReducer(
  persistConfiAuth,
  authSlice.reducer
);
export const store = configureStore({
  reducer: {
    auth: persistedReducerAuth,

    contacts: persistedReducerItem,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
