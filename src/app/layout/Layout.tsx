import { Outlet } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetMyProfileQuery } from '@/entities/User';
import { NotificationSystem } from '@/widgets/NotificationSystem';
import { LoaderJs } from '@/shared/ui';

export const Layout = () => {
  const { isLoading } = useGetMyProfileQuery(localStorage.getItem('accessToken') ? undefined : skipToken);

  if (isLoading) {
    return <LoaderJs forPage />;
  }

  return (
    <>
      <Outlet />
      <NotificationSystem />
    </>
  );
};
