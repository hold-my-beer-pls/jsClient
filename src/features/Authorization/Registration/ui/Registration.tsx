import { FormEvent } from 'react';
import styles from './Registration.module.scss';
import { dataFromForm } from '@/shared/lib/handlers';
import { Authorization, useRegistrationMutation } from '@/entities/User';
import { Button, Input } from '@/shared/ui';

interface Props {
  onSubmit: VoidFunction;
}

export const Registration = ({ onSubmit }: Props) => {
  const [registration, { isError, isLoading }] = useRegistrationMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = dataFromForm<Authorization>(e);

    registration(userData)
      .unwrap()
      .then(() => onSubmit());
  };

  return (
    <form className={styles.loginData} onSubmit={handleSubmit}>
      <Input className={styles.loginData_field} name="email" type="email" required />
      <Input className={styles.loginData_field} name="password" type="password" required />
      {isError && <div>error</div>}
      {isLoading && <div>loading</div>}
      <Button className={styles.loginData_action} type="submit">
        Зарегистрироваться
      </Button>
    </form>
  );
};
