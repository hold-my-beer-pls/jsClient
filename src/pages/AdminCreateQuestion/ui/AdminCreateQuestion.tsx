import { FormEvent } from 'react';
import styles from './AdminCreateQuestion.module.scss';
import { BreadCrumbs } from '@/shared/ui';
import { Navigation } from '@/shared/constants/navigation.ts';
import { dataFromForm } from '@/shared/lib/handlers/dataFromForm.ts';
import { Form, FormData, getDataForRequest } from '@/features/Question';
import { useCreateQuestionsMutation } from '@/entities/Question';

export const AdminCreateQuestion = () => {
  const [createQuestion, {}] = useCreateQuestionsMutation();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fromData = dataFromForm<FormData>(e);
    const requestData = getDataForRequest(fromData);
    createQuestion(requestData);
  };

  return (
    <div className={styles.container}>
      <BreadCrumbs
        items={[
          { path: Navigation.admin, name: 'Админ панель' },
          { path: Navigation.createQuestion, name: 'Создать вопрос' },
        ]}
      />
      <div className={styles.label}>Создать вопрос</div>
      <Form onClick={handleSubmit} />
    </div>
  );
};
