import { FormEvent } from 'react';
import styles from './Registration.module.scss';
import { dataFromForm } from '@/shared/lib/handlers';
import { Authorization, useRegistrationMutation } from '@/entities/User';

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
    <div className={styles.authForm}>
      <form onSubmit={handleSubmit}>
        <input className={styles.answerText} name="email" type="email" required />
        <input className={styles.answerText} name="password" type="password" required />
        {isError && <div>error</div>}
        {isLoading && <div>loading</div>}
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};
