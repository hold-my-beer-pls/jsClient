import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './Complete.module.scss';
import { Button, Dropdown } from '@/shared/ui';
import CloseCircleIcon from '@/shared/assets/icons/close-circle.svg';
import { useIsMobile } from '@/shared/lib/hooks';

export const Complete = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <Dropdown className={cn(styles.dropdown, { [styles.mobileDropdown]: isMobile })}>
      {isMobile ? (
        <div className={styles.mobileClose}>
          <CloseCircleIcon />
        </div>
      ) : (
        <Button>Завершить</Button>
      )}
      <div className={styles.content}>
        <div className={styles.content_title}>Действительно хотите завершить?</div>
        <div className={styles.content_actions}>
          <Button onClick={() => navigate('/')}>Да</Button>
          <Button theme="secondary">Отмена</Button>
        </div>
      </div>
    </Dropdown>
  );
};
