import { ReactNode, useEffect, useState } from 'react';
import cn from 'classnames';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import Close from '@/shared/assets/icons/close.svg';

interface Props {
  isOpen: boolean;
  children: ReactNode;
  onClose: VoidFunction;
  onAfterClose?: VoidFunction;
  className?: string;
}

export const Modal = ({ isOpen, onClose, onAfterClose, children, className }: Props) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [canCloseSidebar, setCanCloseSidebar] = useState(false);
  const portal = document.getElementById('root') ?? document.body;

  useEffect(() => {
    if (isOpen) {
      portal.style.overflow = 'hidden';

      return () => {
        portal.style.overflow = 'visible';
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && internalIsOpen) {
      setCanCloseSidebar(true);
    } else {
      setInternalIsOpen(isOpen);
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (canCloseSidebar) {
      setInternalIsOpen(false);
      setCanCloseSidebar(false);
      onAfterClose?.();
    }
  };

  if (!internalIsOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={cn(styles.modalBackground, { [styles.close]: canCloseSidebar }, className)}
      onAnimationEnd={handleAnimationEnd}
      onClick={onClose}
      role="presentation"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} role="presentation">
        <div className={styles.modal_closeButton} onClick={onClose} role="presentation">
          <Close />
        </div>
        {children}
      </div>
    </div>,
    portal,
  );
};
