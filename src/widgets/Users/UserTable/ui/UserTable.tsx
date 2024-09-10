import { useState } from 'react';
import styles from './UserTable.module.scss';
import { Roles, selectAllUsers, useGetAllQuery } from '@/entities/User';
import { useAppSelector, useIntersectionObserver, useNotification } from '@/shared/lib/hooks';
import { Dropdown, Error, Loader, LoaderJs } from '@/shared/ui';
import MoreIcon from '@/shared/assets/icons/more.svg';
import { ActionInTable } from '@/features/User/ActionInTable';

export const UserTable = () => {
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const { isLoading, error, isFetching } = useGetAllQuery({ page, limit: 20 });
  const userList = useAppSelector(selectAllUsers);

  const getNextPage = () => {
    if (!userList) return;

    const { currentPage, totalPages } = userList;

    if (currentPage >= totalPages - 1) {
      setHasNextPage(false);
    } else {
      setPage((prev) => prev + 1);
    }
  };

  const observerRef = useIntersectionObserver<HTMLDivElement>(getNextPage, [hasNextPage, !isFetching]);
  useNotification(error);

  if (isLoading) {
    return <Loader />;
  }

  if (!userList?.data) {
    return <Error error="Пользователи пропали" />;
  }

  return (
    <>
      {userList.data.map((user) => (
        <div key={user.id} className={styles.container}>
          <div>{user.name}</div>
          <div>{user.email}</div>
          <Dropdown className={styles.dropdown}>
            <MoreIcon />
            <ActionInTable userId={user.id} isAdmin={user.roles.some((role) => role === Roles.admin)} />
          </Dropdown>
        </div>
      ))}
      {isFetching && <LoaderJs />}
      <div ref={observerRef} className={styles.observer} />
    </>
  );
};
