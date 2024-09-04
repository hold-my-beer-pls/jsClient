import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

export const useLaunchParams = () => {
  try {
    return retrieveLaunchParams();
  } catch (e) {
    return false;
  }
};
