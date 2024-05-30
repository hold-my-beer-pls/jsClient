import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import JSLogoIcon from '@/shared/assets/JavaScriptLogo.svg';
import ProfileIcon from '@/shared/assets/icons/profile-circle.svg';

export const Layout = () => {
  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.toolbar_logo}>
          <JSLogoIcon />
        </div>
        <div className={styles.toolbar_profile}>
          <ProfileIcon />
        </div>
      </div>
      <Outlet />
    </>
  );
};
