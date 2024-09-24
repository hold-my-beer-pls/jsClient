import { BackButton } from '@twa-dev/sdk/react';
import WebApp from '@twa-dev/sdk';
import styles from './AnswersBackButton.module.scss';
import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg';

interface Props {
  onClick: VoidFunction;
}

export const AnswersBackButtonMobile = ({ onClick }: Props) => {
  return WebApp.platform === 'unknown' ? (
    <div className={styles.mobileClose} onClick={onClick} role="presentation">
      <ArrowLeftIcon />
    </div>
  ) : (
    <BackButton onClick={onClick} />
  );
};
