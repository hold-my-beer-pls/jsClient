import { useEffect } from 'react';
import { quizStage, reset, selectStage } from '@/entities/Quiz';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { QuizResult } from '@/widgets/Quiz/QuizResult';
import { QuizAnswers } from '@/widgets/Quiz/QuizAnswers';
import { QuizQuestions } from '@/widgets/Quiz/QuizQuestions';

export const Quiz = () => {
  const dispatch = useAppDispatch();
  const stage = useAppSelector(selectStage);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  if (stage === quizStage.result) {
    return <QuizResult />;
  }
  if (stage === quizStage.answers) {
    return <QuizAnswers />;
  }

  return <QuizQuestions />;
};
