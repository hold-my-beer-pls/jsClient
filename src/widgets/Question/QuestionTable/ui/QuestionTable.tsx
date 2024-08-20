import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './QuestionTable.module.scss';
import { selectQuestions, useGetAllQuestionsQuery } from '@/entities/Question';
import { Dropdown, Loader } from '@/shared/ui';
import MoreIcon from '@/shared/assets/icons/more.svg';
import { QuestionActions, VisibleCheckbox } from '@/features/Question';
import { useAppSelector, useIntersectionObserver, useNotification } from '@/shared/lib/hooks';
import { Navigation } from '@/shared/constants';

export const QuestionTable = () => {
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const questions = useAppSelector(selectQuestions);
  const { isLoading, isFetching, error } = useGetAllQuestionsQuery({ page, limit: 20 });
  const navigate = useNavigate();

  const getNextPage = () => {
    if (!questions) return;

    const { currentPage, totalPages } = questions;

    if (currentPage >= totalPages - 1) {
      setHasNextPage(false);
    } else {
      setPage((prev) => prev + 1);
    }
  };

  const observerRef = useIntersectionObserver<HTMLDivElement>(getNextPage, [hasNextPage, !isFetching]);
  useNotification(error);

  if (isLoading) {
    return <Loader />;
  }

  if (!questions?.data) {
    return <div>pusto</div>;
  }

  return (
    <>
      {questions.data.map((question) => (
        <div
          key={question.id}
          className={styles.question}
          onClick={() => navigate(`${Navigation.admin}/${Navigation.questionsList}/${question.id}`)}
          role="presentation"
        >
          <div className={styles.question_visible}>
            <VisibleCheckbox id={question.id} visible={question.visible} />
          </div>
          <div className={styles.information}>
            <div className={styles.information_text}>{question.question}</div>
            <div className={styles.description}>
              <div className={styles.description_item}>{question.complexity}</div>
              <div className={styles.description_item}>{question.theme ?? 'Без темы'}</div>
            </div>
          </div>
          <Dropdown className={styles.dropdown}>
            <MoreIcon />
            <QuestionActions id={question.id} />
          </Dropdown>
        </div>
      ))}
      {isFetching && <Loader />}
      <div ref={observerRef} className={styles.observer} />
    </>
  );
};
