import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const navigate = useNavigate();

  const click = () => {
    fetch('/api/v1/me', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV2Z2VuQG1haWwuY29tIiwiaWQiOiI5YzMwYTNiYy1jOTc0LTQ1Y2QtOTIyYy02YTJhYThiMjE5M2QiLCJyb2xlcyI6WyJVU0VSIiwiQURNSU4iXSwiaWF0IjoxNzE3NTA0MjY5LCJleHAiOjE3MTc2MTIyNjl9.esjDCdKubjRaByh2EVggQ-sdSzxArGU1OKuC5r2fq3A',
      },
    });
  };

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
          onClick={click}
        >
          Авторизоваться
        </button>
      </div>
      <div className={styles.block}>
        Настройки
        {import.meta.env.BASE_URL}
      </div>
      <div className={styles.block}>Статистика</div>
    </div>
  );
};
