import { shallowEqual } from 'react-redux';
import styles from './QuizAnswers.module.scss';
import { Button, Error } from '@/shared/ui';
import { Progress, Question, RightAnswer } from '@/features/Quiz';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { quizStage, selectAnswers, setNextAnswer, setStage } from '@/entities/Quiz';

export const QuizAnswers = () => {
  const dispatch = useAppDispatch();
  const { rightAnswers, currentAnswer, userAnswers } = useAppSelector(selectAnswers, shallowEqual);
  const currentQuestionNumber = rightAnswers.findIndex(({ id }) => id === currentAnswer?.id);

  const handleSetNextAnswer = (state: 'prev' | 'next') => {
    dispatch(setNextAnswer(state === 'prev' ? -1 : 1));
  };

  if (!rightAnswers.length || !currentAnswer) {
    return <Error error="Потеряли ответы" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <Button className={styles.actionsBlock_action} onClick={() => dispatch(setStage(quizStage.result))}>
            Назад
          </Button>
        </div>
        <Progress currentPosition={currentQuestionNumber + 1} numberQuestions={rightAnswers.length} />
        <div />
      </div>
      <Question question={currentAnswer?.question || ''} code={currentAnswer?.code || ''} />
      <RightAnswer answerEntity={currentAnswer} userAnswerId={userAnswers[currentAnswer.id]} />
      <div className={styles.actions}>
        <Button
          className={styles.actions_item}
          onClick={() => handleSetNextAnswer('prev')}
          disabled={!currentQuestionNumber}
        >
          Назад
        </Button>
        <Button
          className={styles.actions_item}
          onClick={() => handleSetNextAnswer('next')}
          disabled={currentQuestionNumber === rightAnswers.length - 1}
        >
          Дальше
        </Button>
      </div>
    </div>
  );
};
