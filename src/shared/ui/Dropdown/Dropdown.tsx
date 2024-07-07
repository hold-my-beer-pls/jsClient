import { MouseEvent, ReactNode, useState } from 'react';
import { Placement as PopperPlacementT } from '@popperjs/core';
import { usePopper } from 'react-popper';
import cn from 'classnames';
import styles from './Dropdown.module.scss';

interface Props {
  children: [ReactNode, ReactNode];
  placement?: PopperPlacementT;
  canClose?: boolean;
  isModal?: boolean;
  className?: string;
  buttonClassName?: string;
  contentClassName?: string;
}

export const Dropdown = ({
  children,
  placement = 'auto',
  canClose = true,
  isModal = true,
  className,
  buttonClassName,
  contentClassName,
}: Props) => {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { styles: popperStyles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
  });

  const handleClickTrigger = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (canClose) {
      setIsOpen(false);
    }
  };

  return (
    <div className={cn(styles.dropdownContainer, className)}>
      <div
        className={cn(styles.trigger, buttonClassName)}
        onClick={handleClickTrigger}
        ref={setReferenceElement}
        role="presentation"
      >
        {children[0]}
      </div>
      {isOpen && (
        <>
          <div
            className={cn(styles.content, contentClassName)}
            ref={setPopperElement}
            style={popperStyles.popper}
            {...attributes.popper}
            onClick={handleClose}
            role="presentation"
          >
            {children[1]}
          </div>
          {isModal && <div className={styles.modalWrapper} onClick={handleClose} role="presentation" />}
        </>
      )}
    </div>
  );
};
