import { Outlet } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetMyProfileQuery } from '@/entities/Profile';

export const Authorization = () => {
  const { isLoading } = useGetMyProfileQuery(localStorage.getItem('accessToken') ? undefined : skipToken);
  console.log(isLoading);
  return <Outlet />;
};
