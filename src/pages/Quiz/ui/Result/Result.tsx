import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { quizStage, reset, selectAnswers, selectStage, useCompleteQuizMutation } from '@/entities/Quiz';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { QuizResult } from '@/widgets/Quiz/QuizResult';
import { QuizAnswers } from '@/widgets/Quiz/QuizAnswers';
import { Error, LoaderJs } from '@/shared/ui';

const Result = () => {
  const stage = useAppSelector(selectStage);
  const [completeQuiz, { isLoading, isUninitialized }] = useCompleteQuizMutation();
  const { userAnswers } = useAppSelector(selectAnswers, shallowEqual);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const answersList = Object.entries(userAnswers).map((item) => ({
      questionId: item[0],
      selectedAnswerId: item[1],
    }));
    completeQuiz({ answers: answersList });

    return () => {
      dispatch(reset());
    };
  }, []);

  if (!Object.keys(userAnswers).length) {
    return <Error forPage />;
  }

  if (isUninitialized || isLoading) {
    return <LoaderJs forPage />;
  }

  if (stage === quizStage.answers) {
    return <QuizAnswers />;
  }

  return <QuizResult />;
};

export default Result;
