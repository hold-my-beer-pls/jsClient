import cn from 'classnames';
import styles from './Progress.module.scss';

interface Props {
  numberQuestions: number;
  currentPosition: number;
}

export const Progress = ({ numberQuestions, currentPosition }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.status}>
        <div className={styles.status_step}>{`Вопрос ${currentPosition} из ${numberQuestions}`}</div>
        <div className={styles.status_theme}>Хранение данных в браузере</div>
      </div>
      <div className={styles.progress}>
        {[...Array(numberQuestions).keys()].map((item, index) => (
          <div
            key={item}
            className={cn(styles.progress_item, {
              [styles.progress_item__past]: index < currentPosition,
              [styles.progress_item__current]: index + 1 === currentPosition,
            })}
          />
        ))}
      </div>
    </div>
  );
};
