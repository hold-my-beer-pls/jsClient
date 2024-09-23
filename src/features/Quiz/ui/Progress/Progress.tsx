import cn from 'classnames';
import { useEffect, useState } from 'react';
import styles from './Progress.module.scss';

interface Props {
  numberQuestions: number;
  currentPosition: number;
  hasTimer?: boolean;
  resultList?: boolean[];
}

export const Progress = ({ numberQuestions, currentPosition, resultList, hasTimer }: Props) => {
  const [time, setTime] = useState(30);

  useEffect(() => {
    if (hasTimer) {
      const timer = setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);

      return () => {
        setTime(30);
        clearInterval(timer);
      };
    }
  }, [currentPosition]);

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
            className={cn(
              styles.progress_item,
              {
                [styles.progress_item__past]: index < currentPosition,
                [styles.progress_item__current]: index + 1 === currentPosition,
              },
              resultList && {
                [styles.progress_item__result]: index + 1 === currentPosition,
                [styles.progress_item__correct]: resultList?.[index],
                [styles.progress_item__wrong]: !resultList?.[index],
              },
            )}
          />
        ))}
      </div>
      {hasTimer && (
        <div>
          Осталось времени &nbsp;
          {time}
        </div>
      )}
    </div>
  );
};
