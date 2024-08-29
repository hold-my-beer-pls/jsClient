import { useState } from 'react';
import styles from './Authorization.module.scss';
import { Modal } from '@/shared/ui';
import { Login } from '@/features/Authorization/Login';
import { Registration } from '@/features/Authorization/Registration';
import { Auth } from '@/widgets/Authorization';

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}

export const Authorization = ({ isOpen, onClose }: Props) => {
  const [authState, setAuthState] = useState<Auth>(Auth.login);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modal}>
        {authState === Auth.login ? (
          <>
            <div className={styles.label}>Вход</div>
            <Login onSubmit={onClose} />
            <div className={styles.linkButton} onClick={() => setAuthState(Auth.registration)} role="presentation">
              Зарегистрироваться
            </div>
          </>
        ) : (
          <>
            <div className={styles.label}>Регистрация</div>
            <Registration onSubmit={onClose} />
            <div className={styles.linkButton} onClick={() => setAuthState(Auth.login)} role="presentation">
              уже зарегистрированы?
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
