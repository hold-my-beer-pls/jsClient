import { FormEvent } from 'react';
import styles from './Login.module.scss';
import { Authorization, useLoginMutation } from '@/entities/User';
import { dataFromForm } from '@/shared/lib/handlers/dataFromForm.ts';
import { Button } from '@/shared/ui';
import { useNotification } from '@/shared/lib/hooks';

interface Props {
  onSubmit: VoidFunction;
}

export const Login = ({ onSubmit }: Props) => {
  const [loginFetch, { isError, isLoading, error }] = useLoginMutation();
  useNotification(error);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = dataFromForm<Authorization>(e);

    loginFetch(userData)
      .unwrap()
      .then(() => onSubmit());
  };

  return (
    <form className={styles.loginData} onSubmit={handleSubmit}>
      <input className={styles.answerText} placeholder="email" name="email" type="email" required />
      <input className={styles.answerText} placeholder="password" name="password" type="password" required />
      {isError && <div>error</div>}
      {isLoading && <div>loading</div>}
      <div className={styles.loginData_login}>
        <Button type="submit">Войти</Button>
      </div>
    </form>
  );
};
