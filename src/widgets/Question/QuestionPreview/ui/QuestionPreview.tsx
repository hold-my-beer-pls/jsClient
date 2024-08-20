import { useParams } from 'react-router-dom';
import styles from './QuestionPreview.module.scss';
import { BreadCrumbs } from '@/shared/ui';
import { Navigation } from '@/shared/constants';
import { useAppSelector } from '@/shared/lib/hooks';
import { selectQuestions } from '@/entities/Question';
import { Question, RightAnswer } from '@/features/Quiz';

export const QuestionPreview = () => {
  const { id } = useParams();
  const questions = useAppSelector(selectQuestions);
  const currentQuestion = questions?.data.find((question) => question.id === id);

  if (!id || !currentQuestion) {
    return <div>pusto</div>;
  }

  return (
    <div className={styles.container}>
      <BreadCrumbs
        items={[
          { path: Navigation.admin, name: 'Админ панель' },
          { path: Navigation.questionsList, name: 'Список вопросов' },
          { path: Navigation.id, name: 'Предпросмотр' },
        ]}
      />
      <div className={styles.question}>
        <Question question={currentQuestion.question} code={currentQuestion.code} />
        <RightAnswer answerEntity={currentQuestion} userAnswerId={null} />
      </div>
    </div>
  );
};
