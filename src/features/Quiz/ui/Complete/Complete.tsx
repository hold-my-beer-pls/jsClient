import { useNavigate } from 'react-router-dom';
import styles from './Complete.module.scss';
import { Button, Dropdown } from '@/shared/ui';

export const Complete = () => {
  const navigate = useNavigate();

  return (
    <Dropdown className={styles.dropdown}>
      <Button>Завершить</Button>
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
