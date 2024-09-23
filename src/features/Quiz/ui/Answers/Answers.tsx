import cn from 'classnames';
import { useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import styles from './Answers.module.scss';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { selectAnswers, setAnswer, setNextQuestion } from '@/entities/Quiz';
import { TelegramButton } from '@/entities/Telegram';
import { Navigation } from '@/shared/constants';
import { TIMER } from '@/features/Quiz/model/constants.ts';

interface Props {
  answers: { id: string; text: string }[];
  questionId: string;
  hasTimer?: boolean;
  demo?: boolean;
}

export const Answers = ({ answers, questionId, hasTimer = false, demo = false }: Props) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { isLastQuestion } = useAppSelector(selectAnswers, shallowEqual);
  const navigate = useNavigate();

  useEffect(() => {
    return () => WebApp?.MainButton.hide();
  }, []);

  useEffect(() => {
    if (hasTimer) {
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, TIMER);

      return () => clearInterval(timer);
    }
  }, [questionId]);

  const handleNextQuestion = () => {
    dispatch(setAnswer({ questionId, answerId: selectedId }));
    dispatch(setNextQuestion());
    setSelectedId(null);

    if (isLastQuestion) {
      navigate(`${Navigation.quiz}/${Navigation.result}`);
    }
  };

  return (
    <>
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
      </div>
      {!demo && (
        <div className={styles.action}>
          <TelegramButton
            className={styles.action_next}
            onClick={handleNextQuestion}
            disabled={!selectedId}
            text={isLastQuestion ? 'Завершить' : 'Ответить'}
          />
          <TelegramButton
            className={styles.action_next}
            onClick={handleNextQuestion}
            theme="secondary"
            text="Нет ответа"
            position="right"
          />
        </div>
      )}
    </>
  );
};
