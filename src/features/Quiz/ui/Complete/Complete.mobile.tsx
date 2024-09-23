import WebApp from '@twa-dev/sdk';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '@twa-dev/sdk/react';
import styles from '@/features/Quiz/ui/Complete/Complete.module.scss';
import CloseCircleIcon from '@/shared/assets/icons/close-circle.svg';
import { Navigation } from '@/shared/constants';

export const CompleteMobile = () => {
  const navigate = useNavigate();
  const handleConfirm = () => {
    const message = 'Действительно хотите завершить тест?';
    const fn = () => navigate(Navigation.home);
    if (WebApp.platform === 'unknown') {
      confirm(message) && fn();
    } else {
      WebApp.showConfirm(message, fn);
    }
  };

  return WebApp.platform === 'unknown' ? (
    <span className={styles.mobileClose} onClick={handleConfirm} role="presentation">
      <CloseCircleIcon />
    </span>
  ) : (
    <BackButton onClick={handleConfirm} />
  );
};
