import { Outlet } from 'react-router-dom';
import styles from './Header.module.scss';
import JSLogoIcon from '@/shared/assets/JavaScriptLogo.svg';
import ProfileIcon from '@/shared/assets/icons/profile-circle.svg';
import { useAppSelector } from '@/shared/lib/hooks';
import { selectUserForHeader } from '@/entities/User';

export const Header = () => {
  const { name, email, isAuthenticated } = useAppSelector(selectUserForHeader);
  const profileWord = name ? name[0] : email[0];

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.toolbar_logo}>
          <JSLogoIcon />
        </div>
        <div className={styles.toolbar_profile}>
          {isAuthenticated ? (
            <div className={styles.toolbar_profile_contour}>{profileWord || '?'}</div>
          ) : (
            <ProfileIcon />
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};
