import { shallowEqual } from 'react-redux';
import cn from 'classnames';
import { skipToken } from '@reduxjs/toolkit/query';
import styles from './QuizQuestions.module.scss';
import { selectQuizQuestions, useGetQuestionsQuery } from '@/entities/Quiz';
import { Answers, Complete, Progress, Question } from '@/features/Quiz';
import { useAppSelector, useIsMobile } from '@/shared/lib/hooks';
import { Error, Loader } from '@/shared/ui';

export const QuizQuestions = () => {
  const { currentQuestion, questions, options } = useAppSelector(selectQuizQuestions, shallowEqual);
  const { error, isLoading } = useGetQuestionsQuery(questions.length ? skipToken : options);
  const currentQuestionNumber = questions.findIndex(({ id }) => id === currentQuestion?.id);
  const isMobile = useIsMobile();

  if (isLoading) {
    return <Loader forPage />;
  }

  if (!questions.length || !currentQuestion || error) {
    return <Error forPage error={error} />;
  }

  return (
    <div className={cn(styles.container)}>
      <div className={styles.header}>
        <Complete />
        <Progress numberQuestions={questions.length} currentPosition={currentQuestionNumber + 1} />
        {!isMobile && <div />}
      </div>
      <Question question={currentQuestion.question} code={currentQuestion.code} />
      <Answers answers={currentQuestion.answers} questionId={currentQuestion.id} />
    </div>
  );
};
