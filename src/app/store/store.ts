import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api';
import { userSlice } from '@/entities/User';
import { questionSlice } from '@/entities/Question';
import { notificationSlice } from '@/shared/model';
import { quizSlice } from '@/entities/Quiz';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [userSlice.name]: userSlice.reducer,
  [questionSlice.name]: questionSlice.reducer,
  [notificationSlice.name]: notificationSlice.reducer,
  [quizSlice.name]: quizSlice.reducer,
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
