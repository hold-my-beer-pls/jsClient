import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertTypes, Notification, NotificationWithType } from '../interfaces';
import { generateId } from '@/shared/lib/handlers';

interface NotificationState {
  notifications: {
    id: string;
    value: string;
    type: AlertTypes;
  }[];
}

const initialState: NotificationState = {
  notifications: [],
};

const getText = (text: Notification) => {
  if (typeof text === 'string') {
    return text;
  }

  if (text && 'data' in text && 'status' in text) {
    return text.data.message;
  }

  if (text?.message) {
    return text.message;
  }

  return 'Неизвестная ошибка';
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, { payload: { type, notification } }: PayloadAction<NotificationWithType>) => {
      state.notifications = [...state.notifications, { id: generateId(), value: getText(notification), type }];
    },
    removeNotification: (state, { payload: id }: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((item) => item.id !== id);
    },
    shiftNotification: (state) => {
      const notifications = [...state.notifications];
      notifications.shift();
      state.notifications = notifications;
    },
  },
});

export const { addNotification, shiftNotification, removeNotification } = notificationSlice.actions;
