import styles from './QuestionActions.module.scss';
import { removeQuestion, useDeleteQuestionMutation } from '@/entities/Question';
import { useAppDispatch } from '@/shared/lib/hooks';

interface Props {
  id: string;
  onEdit: (id: string) => void;
}

export const QuestionActions = ({ id, onEdit }: Props) => {
  const [deleteQuestion] = useDeleteQuestionMutation();
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    deleteQuestion(id)
      .unwrap()
      .then(() => dispatch(removeQuestion(id)));
  };

  return (
    <div className={styles.container}>
      <div className={styles.item} onClick={() => onEdit(id)} role="presentation">
        Редактировать
      </div>
      <div className={styles.item} onClick={handleDelete} role="presentation">
        Удалить
      </div>
    </div>
  );
};
