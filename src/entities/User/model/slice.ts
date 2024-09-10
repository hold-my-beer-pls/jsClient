import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { Profile, Roles } from './interfaces.ts';
import { userApi } from '../api/api.ts';
import { PaginationResponse } from '@/shared/interfaces';

interface UserState extends Profile {
  isAuthenticated: boolean;
  userList: PaginationResponse<Profile> | null;
}

const initialState: UserState = {
  name: null,
  email: null,
  roles: [],
  id: '',
  tgId: null,
  isAuthenticated: false,
  userList: null,
};

const setUser = (
  state: Draft<UserState>,
  profile: Omit<UserState, 'isAuthenticated' | 'userList'> & Partial<Pick<UserState, 'isAuthenticated'>>,
) => {
  const { name, id, email, roles, tgId } = profile;
  state.name = name;
  state.id = id;
  state.email = email;
  state.roles = roles;
  state.tgId = tgId;
  state.isAuthenticated = profile.isAuthenticated ?? true;
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, { payload }: PayloadAction<Profile>) => {
      setUser(state, payload);
    },
    editUserRole: (state, { payload }: PayloadAction<string>) => {
      if (state.userList) {
        state.userList.data = state.userList.data.map((user) => {
          if (user.id === payload) {
            const hasAdmin = user.roles.some((role) => role === Roles.admin);
            return { ...user, roles: hasAdmin ? [Roles.user] : [Roles.user, Roles.admin] };
          }
          return user;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.getAll.matchFulfilled, (state, { payload }) => {
        if (payload.currentPage === 0) {
          state.userList = payload;
        } else if (state.userList !== null) {
          state.userList = {
            ...payload,
            data: [...state.userList.data, ...payload.data],
          };
        }
      })
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

export const { setUserData, editUserRole } = userSlice.actions;
