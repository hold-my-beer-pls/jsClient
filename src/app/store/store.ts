import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api';
import { authModalSlice } from '@/widgets/Authorization';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [authModalSlice.name]: authModalSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false,
      }).concat(baseApi.middleware);
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
