import { useEffect } from 'react';
import { reset } from '@/entities/Quiz';
import { useAppDispatch } from '@/shared/lib/hooks';
import { QuizQuestions } from '@/widgets/Quiz/QuizQuestions';

const Quiz = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reset());
  }, []);

  return <QuizQuestions />;
};

export default Quiz;
