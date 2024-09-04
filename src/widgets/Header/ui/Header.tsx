import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './Header.module.scss';
import JSLogoIcon from '@/shared/assets/JavaScriptLogo.svg';
import ProfileIcon from '@/shared/assets/icons/profile-circle.svg';
import { useAppSelector, useLaunchParams } from '@/shared/lib/hooks';
import { selectUser, useLazyLogoutQuery } from '@/entities/User';
// TODO кросс импорт!
import { Authorization } from '@/widgets/Authorization';
import { Navigation } from '@/shared/constants';
import { Dropdown } from '@/shared/ui';

export const Header = () => {
  const launchParams = useLaunchParams();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { name, email, isAuthenticated } = useAppSelector(selectUser);
  const [logout] = useLazyLogoutQuery();

  const profileWord = name ? name[0] : email[0];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.toolbar_logo} onClick={() => navigate(Navigation.home)} role="presentation">
          <JSLogoIcon />
        </div>
        <div className={styles.toolbar_profile}>
          <div className={styles.profile}>
            {isAuthenticated ? (
              <Dropdown className={styles.dropdown} placement="bottom-start">
                <div className={styles.trigger_icon}>{profileWord || '?'}</div>
                <>
                  <div className={styles.content_item} onClick={() => navigate(Navigation.profile)} role="presentation">
                    Профиль
                  </div>
                  {!launchParams && (
                    <div className={styles.content_item} onClick={handleLogout} role="presentation">
                      Выйти
                    </div>
                  )}
                </>
              </Dropdown>
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
