import { useNavigate } from 'react-router-dom';
import styles from './QuestionActions.module.scss';
import {
  removeQuestion,
  setCurrentQuestion,
  setModalIsShown,
  setModalMode,
  useDeleteQuestionMutation,
} from '@/entities/Question';
import { useAppDispatch, useNotification } from '@/shared/lib/hooks';
import { ModalMode, Navigation } from '@/shared/constants';

interface Props {
  id: string;
}

export const QuestionActions = ({ id }: Props) => {
  const [deleteQuestion, { error }] = useDeleteQuestionMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useNotification(error);

  const handleEditQuestion = (questionId: string) => {
    dispatch(setModalIsShown(true));
    dispatch(setModalMode(ModalMode.edit));
    dispatch(setCurrentQuestion(questionId));
  };

  const handleDelete = () => {
    deleteQuestion(id)
      .unwrap()
      .then(() => dispatch(removeQuestion(id)));
  };

  return (
    <div className={styles.container}>
      <div className={styles.item} onClick={() => handleEditQuestion(id)} role="presentation">
        Редактировать
      </div>
      <div className={styles.item} onClick={handleDelete} role="presentation">
        Удалить
      </div>
      <div
        className={styles.item}
        onClick={() => navigate(`${Navigation.admin}/${Navigation.questionsList}/${id}`)}
        role="presentation"
      >
        Предпросмотр
      </div>
    </div>
  );
};
