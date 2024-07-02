import { InputHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Input.module.scss';

interface Props {
  label?: string;
}

export const Input = ({ label, className, ...args }: Props & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={cn(styles.inputContainer, className)}>
      {label && <div className={styles.inputContainer_label}>{label}</div>}
      <input {...args} />
    </div>
  );
};
