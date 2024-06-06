import { FormEvent } from 'react';
import styles from './Registration.module.scss';

export const Registration = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    console.log(Object.fromEntries(data));
  };

  return (
    <div className={styles.authForm}>
      <form onSubmit={handleSubmit}>
        <input className={styles.answerText} name="email" type="email" required />
        <input className={styles.answerText} name="password" type="password" required />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};
