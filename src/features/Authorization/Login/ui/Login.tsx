import { FormEvent } from 'react';
import styles from './Login.module.scss';
import { Authorization, useLoginMutation } from '@/entities/User';
import { dataFromForm } from '@/shared/lib/handlers/dataFromForm.ts';
import { Button, Input } from '@/shared/ui';
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
      <Input className={styles.loginData_field} placeholder="email" name="email" type="email" required />
      <Input className={styles.loginData_field} placeholder="password" name="password" type="password" required />
      {isError && <div>error</div>}
      {isLoading && <div>loading</div>}
      <Button className={styles.loginData_action} type="submit">
        Войти
      </Button>
    </form>
  );
};
