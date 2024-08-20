import { useEffect } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useRedux.ts';
import { addNotification } from '@/shared/model';
import { AlertTypes, Notification, NotificationWithType } from '@/shared/interfaces';
import { usePrevious } from '@/shared/lib/hooks';
import { deepEqual } from '@/shared/lib/handlers';

/**
 * TODO отказать от отображения на первом рендере
 * Хук, который отслеживает переменные, в них должны хранится уведомления
 * @param deps - переменные, когда в них появится значение, они отобразятся
 * @param type
 */
export const useNotification = (
  deps: Notification | Notification[] | NotificationWithType[] | Array<Notification | NotificationWithType>,
  type: AlertTypes = 'error',
) => {
  const dispatch = useAppDispatch();
  const prevDeps = usePrevious(deps);

  useEffect(() => {
    if (!deps) {
      return;
    }

    if (Array.isArray(deps)) {
      deps.map((item, index) => {
        if (!item || (Array.isArray(prevDeps) && deepEqual(item, prevDeps[index]))) {
          return;
        }

        // Notification
        if (typeof item === 'string' || 'status' in item || 'message' in item) {
          dispatch(addNotification({ notification: item, type }));
          return;
        }

        // NotificationWithType
        if ('notification' in item && item.notification) {
          dispatch(addNotification({ ...item }));
          return;
        }

        return item;
      });

      return;
    }

    dispatch(addNotification({ notification: deps, type }));
  }, [JSON.stringify(deps)]);
};
