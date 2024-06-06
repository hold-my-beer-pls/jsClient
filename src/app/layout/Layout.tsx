import { Outlet } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetMyProfileQuery } from '@/entities/User';

export const Layout = () => {
  useGetMyProfileQuery(localStorage.getItem('accessToken') ? undefined : skipToken);

  return <Outlet />;
};
