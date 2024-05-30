import { FormEvent } from 'react';
import styles from './AdminPanel.module.scss';
import { Complexity } from '@/shared/constants';

export const AdminPanel = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    console.log(Object.fromEntries(data));
  };

  return (
    <div className={styles.container}>
      <div className={styles.label}>Добавить вопрос</div>
      <form onSubmit={handleSubmit}>
        <div className={styles.block}>
          <div className={styles.title}>Вопрос *</div>
          <textarea name="questionText" className={styles.text} required />
        </div>
        <div className={styles.block}>
          <div className={styles.title}>Код</div>
          <textarea name="code" className={styles.text} />
        </div>
        <div className={styles.block}>
          <div className={styles.title}>Варианты ответа *</div>
          <div className={styles.answers}>
            <div className={styles.answers_item}>
              <input className={styles.answerText} name="answer1" type="text" required />
              <input name="radioAnswer" id="radioAnswer1" value="answer1" type="radio" required />
            </div>
          </div>
          <div className={styles.answers}>
            <div className={styles.answers_item}>
              <input className={styles.answerText} name="answer2" type="text" required />
              <input name="radioAnswer" id="radioAnswer2" value="answer2" type="radio" required />
            </div>
          </div>
          <div className={styles.answers}>
            <div className={styles.answers_item}>
              <input className={styles.answerText} name="answer3" type="text" required />
              <input name="radioAnswer" id="radioAnswer3" value="answer3" type="radio" required />
            </div>
          </div>
          <div className={styles.answers}>
            <div className={styles.answers_item}>
              <input className={styles.answerText} name="answer4" type="text" required />
              <input name="radioAnswer" id="radioAnswer4" value="answer4" type="radio" required />
            </div>
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.title}>Тема</div>
          <input name="theme" type="text" />
        </div>
        <div className={styles.block}>
          <div className={styles.title}>Обьяснение *</div>
          <input name="explanation" type="text" required />
        </div>
        <div className={styles.block}>
          <div className={styles.title}>Сложность</div>
          <select name="complexity" required>
            <option value={Complexity.low}>Низкая</option>
            <option value={Complexity.average}>Средняя</option>
            <option value={Complexity.hard}>Сложная</option>
          </select>
        </div>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};
