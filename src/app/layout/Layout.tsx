import { Outlet } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { useEffect } from 'react';
import { useGetMyProfileQuery, useLoginWithTgMutation } from '@/entities/User';
import { NotificationSystem } from '@/widgets/NotificationSystem';
import { LoaderJs } from '@/shared/ui';

export const Layout = () => {
  const { initDataRaw } = retrieveLaunchParams();
  const canGetProfile = !!localStorage.getItem('accessToken') && !initDataRaw;
  const [loginWithTg, { isLoading: tgIsLoading }] = useLoginWithTgMutation();
  const { isLoading: profileIsLoading } = useGetMyProfileQuery(canGetProfile ? undefined : skipToken);

  useEffect(() => {
    if (initDataRaw) {
      loginWithTg({ initData: initDataRaw });
    }
  }, []);

  if (tgIsLoading || profileIsLoading) {
    return <LoaderJs forPage />;
  }

  return (
    <>
      <Outlet />
      <NotificationSystem />
    </>
  );
};
