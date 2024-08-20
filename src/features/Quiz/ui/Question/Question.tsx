import styles from './Question.module.scss';
import { CodeHighlighter } from '@/shared/ui';

interface Props {
  question: string;
  code: string | null;
}

export const Question = ({ question, code }: Props) => {
  return (
    <div className={styles.question}>
      <div className={styles.question_label}>{question}</div>
      {code && <CodeHighlighter>{code}</CodeHighlighter>}
    </div>
  );
};
