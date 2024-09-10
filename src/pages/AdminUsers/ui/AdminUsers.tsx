import styles from './AdminUsers.module.scss';
import { BreadCrumbs } from '@/shared/ui';
import { Navigation } from '@/shared/constants';
import { UserTable } from '@/widgets/Users/UserTable';

const AdminUsers = () => {
  return (
    <div className={styles.container}>
      <BreadCrumbs
        items={[
          { path: Navigation.admin, name: 'Админ панель' },
          { path: Navigation.usersList, name: 'Список пользователей' },
        ]}
      />
      <div>Hello, AdminUsers!</div>
      <UserTable />
    </div>
  );
};

export default AdminUsers;
