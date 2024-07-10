import { SerializedError } from '@reduxjs/toolkit';
import { AlertTypes, CustomError } from '@/shared/interfaces';

export type Notification = CustomError | SerializedError | string | undefined;

export interface NotificationWithType {
  notification: Notification;
  type: AlertTypes;
}
