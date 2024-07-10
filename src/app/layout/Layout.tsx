import { Outlet } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetMyProfileQuery } from '@/entities/User';
import { NotificationSystem } from '@/widgets/NotificationSystem';

export const Layout = () => {
  const { isLoading } = useGetMyProfileQuery(localStorage.getItem('accessToken') ? undefined : skipToken);

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <>
      <Outlet />
      <NotificationSystem />
    </>
  );
};
