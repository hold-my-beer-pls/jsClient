import cn from 'classnames';
import { TextareaHTMLAttributes } from 'react';
import styles from './TextArea.module.scss';

interface Props {
  label?: string;
}

export const TextArea = ({
  className,
  label,
  required,
  ...args
}: Props & TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <div className={cn(styles.textAreaContainer, className)}>
      {label && (
        <div className={styles.textAreaContainer_label}>
          {label}
          {required && <span className={styles.textAreaContainer_label__required}>*</span>}
        </div>
      )}
      <textarea className={styles.textAreaContainer_input} required={required} {...args} />
    </div>
  );
};
