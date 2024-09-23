import { KeyboardEvent, memo, ReactNode, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import Close from '@/shared/assets/icons/close.svg';
import { useIsMobile } from '@/shared/lib/hooks';

interface Props {
  isOpen: boolean;
  children: ReactNode;
  onClose: VoidFunction;
  onAfterClose?: VoidFunction;
  className?: string;
}

export const Modal = memo(({ isOpen, onClose, onAfterClose, children, className }: Props) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [canCloseSidebar, setCanCloseSidebar] = useState(false);
  const modalWrapperRef = useRef<HTMLDivElement | null>(null);
  const portal = document.body;

  const isMobile = useIsMobile();

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

  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const handleAnimationEnd = () => {
    if (canCloseSidebar) {
      setInternalIsOpen(false);
      setCanCloseSidebar(false);
      onAfterClose?.();
    } else {
      modalWrapperRef.current?.focus();
    }
  };

  if (!internalIsOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={cn(
        isMobile ? styles.modalBackground_mobile : styles.modalBackground,
        { [styles.close]: canCloseSidebar },
        className,
      )}
      onAnimationEnd={handleAnimationEnd}
      onKeyUp={handleKeyUp}
      onClick={onClose}
      tabIndex={-1}
      ref={modalWrapperRef}
      role="presentation"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} role="presentation">
        <div className={styles.closeButton} onClick={onClose} role="presentation">
          <Close />
        </div>
        {children}
      </div>
    </div>,
    portal,
  );
});
