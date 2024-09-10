import { Select } from '@/shared/ui/Select/Select.tsx';
import styles from '../../styles/common.module.scss';
import { addSettingOption } from '@/entities/Quiz';
import { useAppDispatch } from '@/shared/lib/hooks';

interface Props {
  defaultOption?: string;
}

export const Theme = ({ defaultOption }: Props) => {
  const dispatch = useAppDispatch();

  const handleSelect = (theme: string) => {
    dispatch(addSettingOption({ theme }));
  };

  return (
    <div className={styles.settingItem}>
      <div className={styles.title}>Тема</div>
      <Select options={[]} defaultValue={defaultOption} classname={styles.selectWidth} onChange={handleSelect} />
    </div>
  );
};
