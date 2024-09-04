import { Outlet } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useGetMyProfileQuery, useLoginWithTgMutation } from '@/entities/User';
import { NotificationSystem } from '@/widgets/NotificationSystem';
import { LoaderJs } from '@/shared/ui';
import { useLaunchParams } from '@/shared/lib/hooks';

export const Layout = () => {
  const launchParams = useLaunchParams();
  const canGetProfile = !!localStorage.getItem('accessToken') && !launchParams;
  const [loginWithTg, { isLoading: tgIsLoading }] = useLoginWithTgMutation();
  const { isLoading: profileIsLoading } = useGetMyProfileQuery(canGetProfile ? undefined : skipToken);

  useEffect(() => {
    if (!launchParams) {
      return;
    }

    const { initDataRaw: initData } = launchParams;

    if (initData) {
      loginWithTg({ initData });
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
