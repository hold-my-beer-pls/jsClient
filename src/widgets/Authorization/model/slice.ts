import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthModalState {
  isOpen: boolean;
}

const initialState: AuthModalState = {
  isOpen: false,
};

export const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    setIsOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isOpen = payload;
    },
  },
});

export const { setIsOpen } = authModalSlice.actions;
