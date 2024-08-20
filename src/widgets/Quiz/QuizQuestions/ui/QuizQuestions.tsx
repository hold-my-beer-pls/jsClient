import { shallowEqual } from 'react-redux';
import cn from 'classnames';
import styles from './QuizQuestions.module.scss';
import { selectQuizQuestions, useGetQuestionsQuery } from '@/entities/Quiz';
import { Answers, Complete, Progress, Question } from '@/features/Quiz';
import { useAppSelector, useNotification } from '@/shared/lib/hooks';

export const QuizQuestions = () => {
  const { currentQuestion, questions } = useAppSelector(selectQuizQuestions, shallowEqual);
  const { error } = useGetQuestionsQuery();
  const currentQuestionNumber = questions.findIndex(({ id }) => id === currentQuestion?.id);

  useNotification(error);

  if (!questions.length || !currentQuestion) {
    return <div>pusto</div>;
  }

  return (
    <div className={cn(styles.container)}>
      <div className={styles.header}>
        <Complete />
        <Progress numberQuestions={questions.length} currentPosition={currentQuestionNumber + 1} />
        <div>?</div>
      </div>
      <Question question={currentQuestion.question} code={currentQuestion.code} />
      <Answers answers={currentQuestion.answers} questionId={currentQuestion.id} />
    </div>
  );
};
