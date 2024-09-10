import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useState } from 'react';
import styles from './HomePage.module.scss';
import { Authorization } from '@/widgets/Authorization';
import { useAppSelector } from '@/shared/lib/hooks';
import { selectUser } from '@/entities/User';
import { Button } from '@/shared/ui';
import { Navigation } from '@/shared/constants';
import { Settings } from '@/widgets/Quiz/Settings';

const HomePage = () => {
  const navigate = useNavigate();
  const [authModalIsOpen, setAuthModalModalIsOpen] = useState(false);
  const [settingModalIsOpen, setSettingModalModalIsOpen] = useState(false);
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
        <Button className={styles.buttonGroup_button} onClick={() => setSettingModalModalIsOpen(true)}>
          Настройки
        </Button>
        {!isAuthenticated && (
          <Button className={styles.buttonGroup_button} theme="secondary" onClick={() => setAuthModalModalIsOpen(true)}>
            Авторизоваться
          </Button>
        )}
        {isAdmin && (
          <Button className={styles.buttonGroup_button} theme="secondary" onClick={() => navigate(Navigation.admin)}>
            Админ панель
          </Button>
        )}
      </div>
      <Settings isOpen={settingModalIsOpen} onClose={() => setSettingModalModalIsOpen(false)} />
      <Authorization isOpen={authModalIsOpen} onClose={() => setAuthModalModalIsOpen(false)} />
    </div>
  );
};

export default HomePage;
