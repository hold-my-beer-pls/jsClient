import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './Header.module.scss';
import JSLogoIcon from '@/shared/assets/JavaScriptLogo.svg';
import ProfileIcon from '@/shared/assets/icons/profile-circle.svg';
import LogoutIcon from '@/shared/assets/icons/logout.svg';
import { useAppSelector } from '@/shared/lib/hooks';
import { selectUser } from '@/entities/User';
// кросс импорт!
import { Authorization } from '@/widgets/Authorization';
import { Navigation } from '@/shared/constants';

export const Header = () => {
  const navigate = useNavigate();
  const { name, email, isAuthenticated } = useAppSelector(selectUser);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const profileWord = name ? name[0] : email[0];

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.toolbar_logo} onClick={() => navigate('/')} role="presentation">
          <JSLogoIcon />
        </div>
        <div className={styles.toolbar_profile}>
          <div className={styles.profile}>
            {isAuthenticated ? (
              <>
                <div className={styles.profile_icon} onClick={() => navigate(Navigation.profile)} role="presentation">
                  <div className={styles.profile_icon__word}>{profileWord || '?'}</div>
                </div>
                <div className={styles.profile_icon} onClick={() => alert('logout')} role="presentation">
                  <LogoutIcon />
                </div>
              </>
            ) : (
              <div className={styles.profile_icon} onClick={() => setModalIsOpen(true)} role="presentation">
                <ProfileIcon />
              </div>
            )}
          </div>
        </div>
      </div>
      <Authorization isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />
      <Outlet />
    </>
  );
};
