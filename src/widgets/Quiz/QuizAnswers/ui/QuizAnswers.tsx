import { shallowEqual } from 'react-redux';
import { useEffect, useMemo } from 'react';
import WebApp from '@twa-dev/sdk';
import styles from './QuizAnswers.module.scss';
import { Button, Error } from '@/shared/ui';
import { Progress, Question, RightAnswer } from '@/features/Quiz';
import { useAppDispatch, useAppSelector, useIsMobile } from '@/shared/lib/hooks';
import { quizStage, selectAnswers, setNextAnswer, setStage } from '@/entities/Quiz';
import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg';
import { TelegramButton } from '@/entities/Telegram';

export const QuizAnswers = () => {
  const dispatch = useAppDispatch();
  const { rightAnswers, currentAnswer, userAnswers } = useAppSelector(selectAnswers, shallowEqual);
  const currentQuestionNumber = rightAnswers.findIndex(({ id }) => id === currentAnswer?.id);
  const isMobile = useIsMobile();

  const nextButtonIsDisabled = currentQuestionNumber === rightAnswers.length - 1;

  const correctList = useMemo(() => {
    return rightAnswers.map((item) => item.correct);
  }, [rightAnswers]);

  useEffect(() => {
    return () => WebApp?.MainButton.hide();
  }, []);

  const handleSetNextAnswer = (state: 'prev' | 'next') => {
    dispatch(setNextAnswer(state === 'prev' ? -1 : 1));
  };

  const handleGoBack = () => {
    dispatch(setStage(quizStage.result));
  };

  const handleFeedback = () => {
    WebApp.openTelegramLink('https://t.me/duk_agent');
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
        <Progress
          currentPosition={currentQuestionNumber + 1}
          numberQuestions={rightAnswers.length}
          resultList={correctList}
        />
        {!isMobile && <div />}
      </div>
      <Question question={currentAnswer?.question || ''} code={currentAnswer?.code || ''} />
      <RightAnswer answerEntity={currentAnswer} userAnswerId={userAnswers[currentAnswer.id]} />
      <div className={styles.actions}>
        <TelegramButton
          text="Назад"
          className={styles.actions_item}
          onClick={() => handleSetNextAnswer('prev')}
          disabled={!currentQuestionNumber}
          theme={currentQuestionNumber ? 'primary' : 'secondary'}
          position="left"
        />
        <TelegramButton
          text="Дальше"
          className={styles.actions_item}
          onClick={() => handleSetNextAnswer('next')}
          disabled={nextButtonIsDisabled}
          type="secondary"
          theme={!nextButtonIsDisabled ? 'primary' : 'secondary'}
          position="right"
        />
        <Button className={styles.actions_item} theme="secondary" onClick={handleFeedback}>
          Нашли ошибку?
        </Button>
      </div>
    </div>
  );
};
