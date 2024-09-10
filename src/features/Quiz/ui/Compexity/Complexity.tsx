import styles from '../../styles/common.module.scss';
import { Select } from '@/shared/ui/Select/Select.tsx';
import { Complexity } from '@/shared/constants';
import { useAppDispatch } from '@/shared/lib/hooks';
import { addSettingOption, removeSettingOption } from '@/entities/Quiz';
import { complexityConfig } from '../../lib/config.ts';

interface Props {
  defaultOption?: string;
}

export const ComplexitySetting = ({ defaultOption }: Props) => {
  const dispatch = useAppDispatch();

  const handleComplexitySelect = (value: string) => {
    if (value !== 'all') {
      dispatch(addSettingOption({ complexity: value as Complexity }));
    } else {
      dispatch(removeSettingOption('complexity'));
    }
  };

  return (
    <div className={styles.settingItem}>
      <div className={styles.title}>Сложность вопросов</div>
      <Select
        options={complexityConfig}
        defaultValue={defaultOption}
        onChange={handleComplexitySelect}
        classname={styles.selectWidth}
      />
    </div>
  );
};
