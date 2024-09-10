import { Select } from '@/shared/ui/Select/Select.tsx';
import styles from '../../styles/common.module.scss';
import { numberQuestionConfig } from '../../lib/config.ts';
import { addSettingOption } from '@/entities/Quiz';
import { useAppDispatch } from '@/shared/lib/hooks';

interface Props {
  defaultOption?: string;
}

export const NumberQuestion = ({ defaultOption }: Props) => {
  const dispatch = useAppDispatch();

  const handleSelect = (limit: string) => {
    dispatch(addSettingOption({ limit: Number(limit) }));
  };

  return (
    <div className={styles.settingItem}>
      <div className={styles.title}>Количество вопросов</div>
      <Select
        options={numberQuestionConfig}
        defaultValue={defaultOption ?? '20'}
        onChange={handleSelect}
        classname={styles.selectWidth}
      />
    </div>
  );
};
