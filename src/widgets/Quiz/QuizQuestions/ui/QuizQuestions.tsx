import { shallowEqual } from 'react-redux';
import cn from 'classnames';
import { skipToken } from '@reduxjs/toolkit/query';
import styles from './QuizQuestions.module.scss';
import { selectQuizQuestions, useGetQuestionsByIdsQuery, useGetQuestionsQuery } from '@/entities/Quiz';
import { Answers, Complete, CompleteMobile, Progress, Question } from '@/features/Quiz';
import { useAppSelector, useIsMobile } from '@/shared/lib/hooks';
import { Error, Loader } from '@/shared/ui';
import { useIds } from '@/widgets/Quiz/QuizQuestions/lib/useIds.ts';

export const QuizQuestions = () => {
  const idsList = useIds();
  const { currentQuestion, questions, options, hasTimer } = useAppSelector(selectQuizQuestions, shallowEqual);
  const { error: questionCustomListError, isLoading: questionCustomListIsLoading } = useGetQuestionsByIdsQuery(
    idsList ?? skipToken,
  );
  const { error: questionListError, isLoading: questionListIsLoading } = useGetQuestionsQuery(
    questions.length || idsList ? skipToken : options,
  );
  const currentQuestionNumber = questions.findIndex(({ id }) => id === currentQuestion?.id);
  const isMobile = useIsMobile();

  if (questionListIsLoading || questionCustomListIsLoading) {
    return <Loader forPage />;
  }

  if (!questions.length || !currentQuestion || questionListError || questionCustomListError) {
    return <Error forPage error={questionListError || questionCustomListError} />;
  }

  return (
    <div className={cn(styles.container)}>
      <div className={styles.header}>
        {isMobile ? <CompleteMobile /> : <Complete />}
        <Progress numberQuestions={questions.length} currentPosition={currentQuestionNumber + 1} hasTimer={hasTimer} />
        {!isMobile && <div />}
      </div>
      <Question question={currentQuestion.question} code={currentQuestion.code} />
      <Answers answers={currentQuestion.answers} questionId={currentQuestion.id} hasTimer={hasTimer} />
    </div>
  );
};
