import cn from 'classnames';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './Snackbar.module.scss';
import ErrorIcon from '@/shared/assets/icons/close-circle.svg';
import SuccessIcon from '@/shared/assets/icons/tick-circle.svg';
import InfoIcon from '@/shared/assets/icons/danger.svg';
import { AlertTypes } from '@/shared/interfaces';

interface Props {
  isShown: boolean;
  text: string;
  label?: string;
  closeText?: string;
  type?: AlertTypes;
  onClose?: () => void;
  className?: string;
  isPortal?: boolean;
}

export const Snackbar = ({
  isShown,
  label,
  text,
  closeText,
  onClose,
  className,
  type = 'error',
  isPortal = true,
}: Props) => {
  const portal = document.getElementById('root') ?? document.body;
  const [isOpen, setIsOpen] = useState(false);
  const [canHidden, setCanHidden] = useState(false);

  useEffect(() => {
    setIsOpen(isShown);

    if (isShown) {
      const timer = setTimeout(() => {
        setCanHidden(true);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isShown]);

  const closeHandler = () => {
    setIsOpen(false);

    if (onClose) {
      onClose();
    }
  };

  const animationEndHandler = () => {
    if (canHidden) {
      setCanHidden(false);
      closeHandler();
    }
  };

  if (!isOpen) return null;

  if (isPortal) {
    return ReactDOM.createPortal(
      <div
        className={cn(styles.container, { [styles.hidden]: canHidden }, className)}
        onClick={closeHandler}
        onAnimationEnd={animationEndHandler}
        role="presentation"
      >
        <div className={styles.alert}>
          <div className={cn(styles.icon, styles[type])}>
            {type === 'info' && <InfoIcon />}
            {type === 'success' && <SuccessIcon />}
            {type === 'error' && <ErrorIcon />}
          </div>
          <div>
            {label && <div className={styles.label}>{label}</div>}
            <div className={styles.description}>{text}</div>
          </div>
          {closeText && <div className={styles.closeText}>{closeText}</div>}
        </div>
      </div>,
      portal,
    );
  }

  return (
    <div
      className={cn(styles.container, { [styles.hidden]: canHidden }, className)}
      onClick={closeHandler}
      onAnimationEnd={animationEndHandler}
      role="presentation"
    >
      <div className={styles.alert}>
        <div className={cn(styles.icon, styles[type])}>
          {type === 'info' && <InfoIcon />}
          {type === 'success' && <SuccessIcon />}
          {type === 'error' && <ErrorIcon />}
        </div>
        <div>
          {label && <div className={styles.label}>{label}</div>}
          <div className={styles.description}>{text}</div>
        </div>
        {closeText && <div className={styles.closeText}>{closeText}</div>}
      </div>
    </div>
  );
};
