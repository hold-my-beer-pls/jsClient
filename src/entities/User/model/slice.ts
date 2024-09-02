import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from './interfaces.ts';
import { userApi } from '../api/api.ts';

interface UserState extends Profile {
  isAuthenticated: boolean;
}

const initialState: UserState = {
  name: null,
  email: '',
  roles: [],
  id: '',
  isAuthenticated: false,
};

const setUser = (
  state: Draft<UserState>,
  profile: Omit<UserState, 'isAuthenticated'> & Partial<Pick<UserState, 'isAuthenticated'>>,
) => {
  const { name, id, email, roles } = profile;
  state.name = name;
  state.id = id;
  state.email = email;
  state.roles = roles;
  state.isAuthenticated = profile.isAuthenticated ?? true;
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, { payload }: PayloadAction<Profile>) => {
      setUser(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.logout.matchFulfilled, (state) => {
        setUser(state, initialState);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addMatcher(userApi.endpoints.getMyProfile.matchFulfilled, (state, { payload }) => {
        setUser(state, payload);
      })
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        const { accessToken, refreshToken, data } = payload;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setUser(state, data);
      })
      .addMatcher(userApi.endpoints.loginWithTg.matchFulfilled, (state, { payload }) => {
        const { accessToken, refreshToken, data } = payload;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setUser(state, data);
      })
      .addMatcher(userApi.endpoints.registration.matchFulfilled, (state, { payload }) => {
        const { accessToken, refreshToken, data } = payload;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setUser(state, data);
      });
  },
});

export const { setUserData } = userSlice.actions;
