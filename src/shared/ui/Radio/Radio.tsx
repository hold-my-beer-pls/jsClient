import { InputHTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import styles from './Radio.module.scss';

interface Props {
  children: ReactNode;
  radioPosition?: 'right' | 'left';
}

export const Radio = ({
  children,
  radioPosition = 'left',
  className,
  ...args
}: Props & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={cn(styles.radio, { [styles.radio__positionRight]: radioPosition === 'right' }, className)}>
      <input className={styles.radio_input} type="radio" {...args} />
      {children}
    </div>
  );
};
