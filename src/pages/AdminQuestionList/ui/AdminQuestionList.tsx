import styles from './AdminQuestionList.module.scss';
import { useGetAllQuestionsQuery } from '@/entities/Question';
import { BreadCrumbs } from '@/shared/ui';
import { Navigation } from '@/shared/constants';
import { QuestionTable } from '@/widgets/QuestionTable';

export const AdminQuestionList = () => {
  const { data } = useGetAllQuestionsQuery();
  console.log(data);

  return (
    <div className={styles.container}>
      <BreadCrumbs
        items={[
          { path: Navigation.admin, name: 'Админ панель' },
          { path: Navigation.questionsList, name: 'Список вопросов' },
        ]}
      />
      {}
      {data && <QuestionTable data={data} />}
    </div>
  );
};
