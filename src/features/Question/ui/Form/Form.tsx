import { FormEvent } from 'react';
import styles from './Form.module.scss';
import { Button, Input, Radio, RadioGroup, TextArea } from '@/shared/ui';
import { Complexity } from '@/shared/constants';
import { QuestionResponse } from '@/entities/Question';

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  currentQuestion: QuestionResponse | null;
}

export const Form = ({ onSubmit, currentQuestion }: Props) => {
  return (
    <form className={styles.questionForm} onSubmit={onSubmit}>
      <TextArea
        className={styles.questionForm_textArea}
        label="Вопрос"
        name="questionText"
        required
        defaultValue={currentQuestion?.question}
      />
      <TextArea
        className={styles.questionForm_textArea}
        label="Код"
        name="code"
        defaultValue={currentQuestion?.code ?? undefined}
      />
      <RadioGroup label="Варианты ответа" className={styles.questionForm_radioGroup}>
        <Radio
          name="radioAnswer"
          id="radioAnswer1"
          value={0}
          required
          defaultChecked={currentQuestion?.correctAnswerId === currentQuestion?.answers[0].id}
        >
          <Input name="answer1" required defaultValue={currentQuestion?.answers[0].text} />
        </Radio>
        <Radio
          name="radioAnswer"
          id="radioAnswer2"
          value={1}
          required
          defaultChecked={currentQuestion?.correctAnswerId === currentQuestion?.answers[1].id}
        >
          <Input name="answer2" required defaultValue={currentQuestion?.answers[1].text} />
        </Radio>
        <Radio
          name="radioAnswer"
          id="radioAnswer3"
          value={2}
          required
          defaultChecked={currentQuestion?.correctAnswerId === currentQuestion?.answers[2].id}
        >
          <Input name="answer3" required defaultValue={currentQuestion?.answers[2].text} />
        </Radio>
        <Radio
          name="radioAnswer"
          id="radioAnswer4"
          value={3}
          required
          defaultChecked={currentQuestion?.correctAnswerId === currentQuestion?.answers[3].id}
        >
          <Input name="answer4" required defaultValue={currentQuestion?.answers[3].text} />
        </Radio>
      </RadioGroup>
      <Input label="Тема" name="theme" defaultValue={currentQuestion?.theme ?? undefined} />
      <TextArea
        className={styles.questionForm_textArea}
        label="Обьяснение"
        name="explanation"
        required
        defaultValue={currentQuestion?.explanation}
      />
      <div className={styles.block}>
        <div className={styles.title}>Сложность</div>
        <select name="complexity" required defaultValue={currentQuestion?.complexity}>
          <option value={Complexity.low}>Низкая</option>
          <option value={Complexity.average}>Средняя</option>
          <option value={Complexity.hard}>Сложная</option>
        </select>
      </div>
      <Button type="submit">Сохранить</Button>
    </form>
  );
};
