import { useNavigate } from 'react-router-dom';
import styles from './Complete.module.scss';
import { Button, Dropdown } from '@/shared/ui';
import { Navigation } from '@/shared/constants';

export const Complete = () => {
  const navigate = useNavigate();

  return (
    <Dropdown placement="bottom-start" className={styles.dropdown}>
      <Button>Завершить</Button>
      <div className={styles.content}>
        <div className={styles.content_title}>Действительно хотите завершить тест?</div>
        <div className={styles.content_actions}>
          <Button onClick={() => navigate(Navigation.home)}>Да</Button>
          <Button theme="secondary">Отмена</Button>
        </div>
      </div>
    </Dropdown>
  );
};
