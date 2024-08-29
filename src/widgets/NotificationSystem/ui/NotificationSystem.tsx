import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import { Snackbar } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { removeNotification, selectNotification } from '@/shared/model';
import styles from './NotificationSystem.module.scss';

export const NotificationSystem = () => {
  const notifications = useAppSelector(selectNotification, shallowEqual);
  const dispatch = useAppDispatch();

  const handleClose = useCallback(
    (id: string) => () => {
      dispatch(removeNotification(id));
    },
    [],
  );

  return (
    notifications && (
      <div className={styles.snackbarList}>
        {notifications.slice(0, 4).map(({ value, id, type }) => (
          <Snackbar
            key={id}
            isShown
            text={value}
            type={type}
            onClose={handleClose(id)}
            className={styles.item}
            isPortal={false}
          />
        ))}
      </div>
    )
  );
};
