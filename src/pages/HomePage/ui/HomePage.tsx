import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useState } from 'react';
import styles from './HomePage.module.scss';
import { Authorization } from '@/widgets/Authorization';
import { useAppSelector } from '@/shared/lib/hooks';
import { selectUser } from '@/entities/User';
import { Button } from '@/shared/ui';
import { Navigation } from '@/shared/constants';

const HomePage = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { isAuthenticated, isAdmin } = useAppSelector(selectUser);

  return (
    <div className={styles.container}>
      <div className={cn(styles.block, styles.preview)}>
        <div className={styles.preview_label}>А ты знаешь JS?</div>
        <div className={styles.preview_description}>Тестируйте свои знания JavaScript и улучшайте навыки в нем!</div>
      </div>
      <div className={cn(styles.block, styles.buttonGroup)}>
        <Button className={styles.buttonGroup_button} onClick={() => navigate(Navigation.quiz)}>
          Пройти тест
        </Button>
        {!isAuthenticated && (
          <Button className={styles.buttonGroup_button} theme="secondary" onClick={() => setModalIsOpen(true)}>
            Авторизоваться
          </Button>
        )}
        {isAdmin && (
          <Button className={styles.buttonGroup_button} theme="secondary" onClick={() => navigate(Navigation.admin)}>
            Админ панель
          </Button>
        )}
      </div>
      <div className={styles.block}>Настройки</div>
      <div className={styles.block}>Статистика</div>
      <Authorization isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />
    </div>
  );
};

export default HomePage;
