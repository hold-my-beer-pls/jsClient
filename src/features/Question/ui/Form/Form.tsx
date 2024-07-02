import { FormEvent } from 'react';
import styles from './Form.module.scss';
import { Button, Input, Radio, RadioGroup, TextArea } from '@/shared/ui';
import { Complexity } from '@/shared/constants';

interface Props {
  onClick: (e: FormEvent<HTMLFormElement>) => void;
}

export const Form = ({ onClick }: Props) => {
  return (
    <form className={styles.questionForm} onSubmit={onClick}>
      <TextArea className={styles.questionForm_textArea} label="Вопрос" name="questionText" required />
      <TextArea className={styles.questionForm_textArea} label="Код" name="code" />
      <RadioGroup label="Варианты ответа" className={styles.questionForm_radioGroup}>
        <Radio name="radioAnswer" id="radioAnswer1" value={0} required>
          <Input name="answer1" required />
        </Radio>
        <Radio name="radioAnswer" id="radioAnswer2" value={1} required>
          <Input name="answer2" required />
        </Radio>
        <Radio name="radioAnswer" id="radioAnswer3" value={2} required>
          <Input name="answer3" required />
        </Radio>
        <Radio name="radioAnswer" id="radioAnswer4" value={3} required>
          <Input name="answer4" required />
        </Radio>
      </RadioGroup>
      <Input label="Тема" name="theme" />
      <TextArea className={styles.questionForm_textArea} label="Обьяснение" name="explanation" required />
      <div className={styles.block}>
        <div className={styles.title}>Сложность</div>
        <select name="complexity" required>
          <option value={Complexity.low}>Низкая</option>
          <option value={Complexity.average}>Средняя</option>
          <option value={Complexity.hard}>Сложная</option>
        </select>
      </div>
      <Button type="submit">Сохранить</Button>
    </form>
  );
};
