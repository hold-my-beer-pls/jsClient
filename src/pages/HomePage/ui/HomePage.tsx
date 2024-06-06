import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useState } from 'react';
import styles from './HomePage.module.scss';
import { Authorization } from '@/widgets/Authorization';

export const HomePage = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={cn(styles.block, styles.preview)}>
        <div className={styles.preview_label}>А ты знаешь JS?</div>
        <div className={styles.preview_description}>Тестируйте свои знания JavaScript и улучшайте навыки в нем!</div>
      </div>
      <div className={cn(styles.block, styles.buttonGroup)}>
        <button className={styles.buttonGroup_button} type="button" onClick={() => navigate('/quiz')}>
          Пройти тест
        </button>
        <button
          className={cn(styles.buttonGroup_button, styles.buttonGroup_button__outline)}
          type="button"
          onClick={() => setModalIsOpen(true)}
        >
          Авторизоваться
        </button>
      </div>
      <div className={styles.block}>Настройки</div>
      <div className={styles.block}>Статистика</div>
      <Authorization isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />
    </div>
  );
};
