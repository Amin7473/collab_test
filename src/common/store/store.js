import { setupListeners } from '@reduxjs/toolkit/query/react';
import { configureStore } from '@reduxjs/toolkit';
import commonReducer from './slices/common';

const store = configureStore({
  reducer: {
    common: commonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch);

export default store;
