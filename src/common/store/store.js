import { setupListeners } from '@reduxjs/toolkit/query/react';
import { configureStore } from '@reduxjs/toolkit';
import commonReducer from './slices/common';
import authReducer from './slices/auth';


const store = configureStore({
  reducer: {
    common: commonReducer,
    auth : authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch);

export default store;
