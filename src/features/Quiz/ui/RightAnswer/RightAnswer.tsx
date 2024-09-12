import cn from 'classnames';
import styles from './RightAnswer.module.scss';
import { AnswersResponse } from '@/entities/Quiz/model/interfaces.ts';
import { QuestionResponse } from '@/entities/Question';

interface Props {
  answerEntity: AnswersResponse | QuestionResponse;
  userAnswerId: string | null;
}

export const RightAnswer = ({ answerEntity, userAnswerId }: Props) => {
  const userAnswer = answerEntity.answers.find(({ id }) => id === userAnswerId);

  return (
    <div className={styles.container}>
      <div className={styles.userAnswer}>
        <div className={styles.label}>Ваш ответ:</div>
        <div>{userAnswer?.text ?? 'Без ответа'}</div>
      </div>
      <div className={styles.rightAnswer}>
        {userAnswer?.id === answerEntity.correctAnswerId ? (
          <div className={cn(styles.label, styles.label__right)}>Вы ответили правильно</div>
        ) : (
          <>
            <div className={cn(styles.label, styles.label__wrong)}>Вы ответили неправильно</div>
            <div className={styles.label}>Правильный ответ:</div>
            <div>{answerEntity.answers.find(({ id }) => id === answerEntity.correctAnswerId)?.text}</div>
          </>
        )}
      </div>
      <div className={styles.explanation}>
        <div className={styles.label}>Разъяснение:</div>
        <div>{answerEntity.explanation}</div>
      </div>
    </div>
  );
};
