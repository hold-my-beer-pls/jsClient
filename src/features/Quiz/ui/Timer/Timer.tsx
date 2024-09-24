import { ChangeEvent, useRef } from 'react';
import styles from './Timer.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks';
import { setHasTimer } from '@/entities/Quiz';

interface Props {
  defaultOption?: boolean;
}

export const Timer = ({ defaultOption }: Props) => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    dispatch(setHasTimer(e.target.checked));
  };

  return (
    <div className={styles.container}>
      <div className={styles.title} onClick={() => checkboxRef.current?.click()} role="presentation">
        Таймер
        <span>(30 секунд)</span>
      </div>
      <input type="checkbox" onChange={handleChange} defaultChecked={defaultOption} ref={checkboxRef} />
    </div>
  );
};
