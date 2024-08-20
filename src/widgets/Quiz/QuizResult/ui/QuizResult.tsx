import { useNavigate } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import styles from './QuizResult.module.scss';
import { Button } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { quizStage, selectAnswers, setStage } from '@/entities/Quiz';

export const QuizResult = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { rightAnswers, quizResult } = useAppSelector(selectAnswers, shallowEqual);

  return (
    <div className={styles.container}>
      <div className={styles.label}>{`Ваш результат ${quizResult} из ${rightAnswers.length}`}</div>
      <div className={styles.actionsBlock}>
        <Button className={styles.actionsBlock_action} onClick={() => dispatch(setStage(quizStage.answers))}>
          Ответы
        </Button>
        <Button className={styles.actionsBlock_action}>Поделиться</Button>
        <Button className={styles.actionsBlock_action} onClick={() => navigate('/')} theme="secondary">
          Выйти
        </Button>
      </div>
    </div>
  );
};
