import styles from './Settings.module.scss';
import { ComplexitySetting, NumberQuestion, Theme } from '@/features/Quiz';
import { Button, Modal } from '@/shared/ui';
import { useAppSelector } from '@/shared/lib/hooks';
import { selectOptions } from '@/entities/Quiz';

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}

export const Settings = ({ isOpen, onClose }: Props) => {
  const options = useAppSelector(selectOptions);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.label}>Настройки</div>
        <div className={styles.settingList}>
          <ComplexitySetting defaultOption={options.complexity} />
          <Theme defaultOption={options.theme} />
          <NumberQuestion defaultOption={options.question} />
        </div>
        <Button onClick={onClose} className={styles.saveButton}>
          Сохранить
        </Button>
      </div>
    </Modal>
  );
};
