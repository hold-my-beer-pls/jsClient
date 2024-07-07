import { MouseEvent, useState } from 'react';
import { useUpdateVisibilityMutation } from '@/entities/Question';
import EyeOpen from '@/shared/assets/icons/eye.svg';
import EyeClose from '@/shared/assets/icons/eye-slash.svg';
import styles from './VisibleCheckbox.module.scss';

interface Props {
  id: string;
  visible: boolean;
}

export const VisibleCheckbox = ({ visible, id }: Props) => {
  const [currentVisible, setCurrentVisible] = useState(visible);
  const [updateVisibility] = useUpdateVisibilityMutation();
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setCurrentVisible(!currentVisible);

    updateVisibility({ id, visible: currentVisible })
      .unwrap()
      .catch(() => {
        setCurrentVisible((prev) => !prev);
      });
  };

  return (
    <div className={styles.container} onClick={handleClick} role="presentation">
      {currentVisible ? <EyeOpen /> : <EyeClose />}
    </div>
  );
};
