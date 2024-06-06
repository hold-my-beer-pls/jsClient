import { FormEvent } from 'react';
import styles from './Login.module.scss';
import { Authorization, useLoginMutation } from '@/entities/User';
import { dataFromForm } from '@/shared/lib/handlers/dataFromForm.ts';

interface Props {
  onSubmit: VoidFunction;
}

export const Login = ({ onSubmit }: Props) => {
  const [loginFetch, { isError, error, isLoading }] = useLoginMutation();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = dataFromForm<Authorization>(e);

    loginFetch(userData)
      .unwrap()
      .then(() => onSubmit());
  };

  console.log(error);

  return (
    <form className={styles.loginData} onSubmit={handleSubmit}>
      <input className={styles.answerText} placeholder="email" name="email" type="email" required />
      <input className={styles.answerText} placeholder="password" name="password" type="password" required />
      {isError && <div>error</div>}
      {isLoading && <div>loading</div>}
      <div className={styles.loginData_login}>
        <button type="submit">Войти</button>
      </div>
    </form>
  );
};
