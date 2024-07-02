import { ReactNode } from 'react';
import cn from 'classnames';
import styles from './RadioGroup.module.scss';

interface Props {
  children: ReactNode;
  label?: string;
  className?: string;
}

export const RadioGroup = ({ children, label, className }: Props) => {
  return (
    <div className={cn(styles.radioGroup, { [styles.radioGroup__withLabel]: !!label }, className)}>
      {label ? (
        <>
          <div className={styles.radioGroup__withLabel_label}>{label}</div>
          <div>{children}</div>
        </>
      ) : (
        children
      )}
    </div>
  );
};
