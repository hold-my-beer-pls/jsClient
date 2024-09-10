import styles from './ActionInTable.module.scss';
import { editUserRole, Roles, useSetRoleMutation } from '@/entities/User';
import { useAppDispatch, useNotification } from '@/shared/lib/hooks';

interface Props {
  userId: string;
  isAdmin: boolean;
}

export const ActionInTable = ({ userId, isAdmin }: Props) => {
  const [setRole, { error }] = useSetRoleMutation();
  const dispatch = useAppDispatch();

  useNotification(error);
  const handleSetAdmin = () => {
    dispatch(editUserRole(userId));
    setRole({ role: Roles.admin, userId })
      .unwrap()
      .catch(() => dispatch(editUserRole(userId)));
  };

  return (
    <div className={styles.container}>
      <div className={styles.item} onClick={handleSetAdmin} role="presentation">
        {isAdmin ? 'Уволить админа' : 'Сделать админом'}
      </div>
    </div>
  );
};
