import styles from './Hardest.module.scss';
import { useGetHardestQuery } from '@/entities/Statistic';
import { CodeHighlighter } from '@/shared/ui';

export const Hardest = () => {
  const { data, isLoading } = useGetHardestQuery();
  const hardest = data?.[0];

  if (isLoading) {
    return <div>skeleton</div>;
  }

  if (!hardest) {
    return <div>pusto</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <div className={styles.description_lable}>{hardest.question.question}</div>
        <div className={styles.description_complexity}>{hardest.question.complexity}</div>
      </div>
      <div>
        <CodeHighlighter>{hardest.question.code}</CodeHighlighter>
      </div>
      <div>
        {`Всего ${Math.floor(
          (hardest.correctAnswers / hardest.totalAnswers) * 100,
        )}% отвечают на этот вопрос правильно`}
      </div>
    </div>
  );
};
