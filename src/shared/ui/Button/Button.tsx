import { MouseEvent, ReactNode } from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

interface Props {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  theme?: 'primary' | 'secondary';
  className?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
}

export const Button = ({ children, onClick, isLoading, disabled, theme = 'primary', type, className }: Props) => {
  return (
    <button
      className={cn(styles[theme], { [styles.loading]: isLoading, [styles.disabled]: disabled }, className)}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
