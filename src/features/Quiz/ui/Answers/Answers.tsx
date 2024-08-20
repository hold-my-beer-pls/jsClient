import cn from 'classnames';
import { useState } from 'react';
import { shallowEqual } from 'react-redux';
import styles from './Answers.module.scss';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { selectAnswers, setAnswer, setNextQuestion, useLazyGetAnswersQuery } from '@/entities/Quiz';
import { Button } from '@/shared/ui';

interface Props {
  answers: { id: string; text: string }[];
  questionId: string;
  demo?: boolean;
}

export const Answers = ({ answers, questionId, demo = false }: Props) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { isLastQuestion, userAnswers } = useAppSelector(selectAnswers, shallowEqual);
  const [getAnswers, { isLoading }] = useLazyGetAnswersQuery();

  const handleNextQuestion = () => {
    dispatch(setAnswer({ questionId, answerId: selectedId }));
    dispatch(setNextQuestion());
    setSelectedId(null);

    if (isLastQuestion) {
      getAnswers([...Object.keys(userAnswers), questionId]);
    }
  };

  if (isLoading) {
    return <div>Проверяем ответы</div>;
  }

  return (
    <div className={styles.answers}>
      {answers.map(({ id, text }) => (
        <div
          key={id}
          className={cn(styles.answers_item, { [styles.answers_item__selected]: selectedId === id })}
          onClick={() => setSelectedId(id)}
          role="presentation"
        >
          {text}
        </div>
      ))}
      {!demo && (
        <div className={styles.action}>
          <Button className={styles.action_next} onClick={handleNextQuestion} disabled={!selectedId}>
            {isLastQuestion ? 'Завершить' : 'Ответить'}
          </Button>
          <Button className={styles.action_next} onClick={handleNextQuestion} theme="secondary">
            Нет ответа
          </Button>
        </div>
      )}
    </div>
  );
};
