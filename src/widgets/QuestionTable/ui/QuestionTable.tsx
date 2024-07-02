import styles from './QuestionTable.module.scss';
import { QuestionResponse } from '@/entities/Question/model/interfaces.ts';
import { PaginationResponse } from '@/shared/interfaces';

interface Props {
  data: PaginationResponse<QuestionResponse>;
}

export const QuestionTable = ({ data }: Props) => {
  const { data: questions } = data;

  return (
    <table className={styles.container}>
      <thead>
        <tr>
          <th>Описание</th>
          <th>Ответ</th>
          <th>Видимость</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {questions.map((question) => (
          <tr key={question.id}>
            <td>{question.question}</td>
            <td>{question.answers.find((answer) => answer.id === question.correctAnswerId)?.text ?? 'error'}</td>
            <td>{question.visible ? '+' : '-'}</td>
            <td>btnDel</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
