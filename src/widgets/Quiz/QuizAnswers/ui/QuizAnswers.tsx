import { shallowEqual } from 'react-redux';
import styles from './QuizAnswers.module.scss';
import { Button, Error } from '@/shared/ui';
import { Progress, Question, RightAnswer } from '@/features/Quiz';
import { useAppDispatch, useAppSelector, useIsMobile } from '@/shared/lib/hooks';
import { quizStage, selectAnswers, setNextAnswer, setStage } from '@/entities/Quiz';
import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg';

export const QuizAnswers = () => {
  const dispatch = useAppDispatch();
  const { rightAnswers, currentAnswer, userAnswers } = useAppSelector(selectAnswers, shallowEqual);
  const currentQuestionNumber = rightAnswers.findIndex(({ id }) => id === currentAnswer?.id);
  const isMobile = useIsMobile();

  const handleSetNextAnswer = (state: 'prev' | 'next') => {
    dispatch(setNextAnswer(state === 'prev' ? -1 : 1));
  };

  const handleGoBack = () => {
    dispatch(setStage(quizStage.result));
  };

  if (!rightAnswers.length || !currentAnswer) {
    return <Error error="Потеряли ответы" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isMobile ? (
          <div className={styles.mobileClose} onClick={handleGoBack} role="presentation">
            <ArrowLeftIcon />
          </div>
        ) : (
          <div>
            <Button className={styles.actionsBlock_action} onClick={handleGoBack}>
              Назад
            </Button>
          </div>
        )}
        <Progress currentPosition={currentQuestionNumber + 1} numberQuestions={rightAnswers.length} />
        {!isMobile && <div />}
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
        <Button className={styles.actions_item} theme="secondary" onClick={() => alert('и чо нахуй?')}>
          Нашли ошибку?
        </Button>
      </div>
    </div>
  );
};
