import cn from 'classnames';
import styles from './Error.module.scss';
import { Button } from '@/shared/ui';
import { Notification } from '@/shared/interfaces';
import { useNotification } from '@/shared/lib/hooks';

interface Props {
  onClick?: VoidFunction;
  error?: Notification;
  className?: string;
  forPage?: boolean;
}

export const Error = ({ onClick, error, forPage = false, className }: Props) => {
  useNotification(error);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.location.replace('/');
    }
  };

  return (
    <div className={cn(styles.container, { [styles.pageError]: forPage }, className)}>
      <div className={styles.label}>Что-то пошло не так...</div>
      <Button onClick={handleClick}>{onClick ? 'Повторить' : 'Главная'}</Button>
    </div>
  );
};
