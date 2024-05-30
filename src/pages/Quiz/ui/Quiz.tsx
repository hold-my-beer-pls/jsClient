import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import styles from './Quiz.module.scss';

export const Quiz = () => {
  const navigate = useNavigate();

  const questionsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const current = 5;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_exit}>
          <button type="button" onClick={() => navigate('/')}>
            Завершить
          </button>
        </div>
        <div className={styles.status}>
          <div className={styles.status_step}>Вопрос 1 из 20</div>
          <div className={styles.status_theme}>Хранение данных в браузере</div>
        </div>
        <div />
      </div>
      <div className={styles.progress}>
        {questionsList.map((item, index) => (
          <div
            key={item}
            className={cn(styles.progress_item, {
              [styles.progress_item__past]: index + 1 < current,
              [styles.progress_item__current]: index + 1 === current,
            })}
          />
        ))}
      </div>
      <div className={styles.question}>
        <div className={styles.question_label}>Что будет выведено в консоль?</div>
        <code>console.log(true + false)</code>
        <div className={styles.answers}>
          <div className={styles.answers_item}>&quot;truefalse&quot;</div>
          <div className={styles.answers_item}>0</div>
          <div className={cn(styles.answers_item, styles.answers_item__selected)}>1</div>
          <div className={styles.answers_item}>NaN</div>
        </div>
      </div>
      <div className={styles.footer}>
        <button className={styles.footer_button} type="button">
          Продолжить
        </button>
        <button className={cn(styles.footer_button, styles.footer_button__outline)} type="button">
          Нет ответа
        </button>
      </div>
    </div>
  );
};
