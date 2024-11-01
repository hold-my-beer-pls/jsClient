import { Outlet, useNavigate } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { useGetMyProfileQuery, useLoginWithTgMutation } from '@/entities/User';
import { NotificationSystem } from '@/widgets/NotificationSystem';
import { LoaderJs } from '@/shared/ui';
import { Navigation } from '@/shared/constants';

export const Layout = () => {
  const canGetProfile = !!localStorage.getItem('accessToken') && WebApp.platform === 'unknown';
  const [loginWithTg, { isLoading: tgIsLoading }] = useLoginWithTgMutation();
  const { isLoading: profileIsLoading } = useGetMyProfileQuery(canGetProfile ? undefined : skipToken);

  const navigate = useNavigate();

  useEffect(() => {
    if (WebApp.platform !== 'unknown') {
      WebApp.ready();
      WebApp.enableClosingConfirmation();
      WebApp.disableVerticalSwipes();
      WebApp.MainButton.hideProgress();
      WebApp.setBackgroundColor('#f2f2f2');
      WebApp.setBottomBarColor('#f2f2f2');

      if (!WebApp.isExpanded) {
        WebApp.expand();
      }

      if (WebApp.initData) {
        loginWithTg({ initData: WebApp.initData });
      }

      const startParam = WebApp.initDataUnsafe.start_param?.split('get-');

      if (startParam?.length === 2) {
        navigate(`${Navigation.quiz}/${startParam[1].replaceAll('=', ',')}`);
      }
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
