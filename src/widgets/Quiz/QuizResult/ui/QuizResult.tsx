import { useNavigate } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import { useState } from 'react';
import styles from './QuizResult.module.scss';
import { Button } from '@/shared/ui';
import { useAppDispatch, useAppSelector, useNotification } from '@/shared/lib/hooks';
import { quizStage, selectAnswers, setStage } from '@/entities/Quiz';
import { shareLink } from '@/widgets/Quiz/QuizResult/model/shareLink.ts';
import { Navigation } from '@/shared/constants';

export const QuizResult = () => {
  const [shareInfo, setShareInfo] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { rightAnswers, quizResult } = useAppSelector(selectAnswers, shallowEqual);
  useNotification(shareInfo, 'success');

  const handleShare = () => {
    setShareInfo('');
    const params = rightAnswers.map((item) => item.id).join('=');
    shareLink(params).then((res) => setShareInfo(res));
  };

  return (
    <div className={styles.container}>
      <div className={styles.label}>{`Ваш результат ${quizResult} из ${rightAnswers.length}`}</div>
      <div className={styles.actionsBlock}>
        <Button className={styles.actionsBlock_action} onClick={() => dispatch(setStage(quizStage.answers))}>
          Ответы
        </Button>
        <Button className={styles.actionsBlock_action} onClick={handleShare}>
          Поделиться
        </Button>
        <Button className={styles.actionsBlock_action} onClick={() => navigate(Navigation.home)} theme="secondary">
          Выйти
        </Button>
      </div>
    </div>
  );
};
