import { useState } from 'react';
import styles from './Authorization.module.scss';
import { Modal } from '@/shared/ui';
import { Login } from '@/features/Authorization/Login';
import { Registration } from '@/features/Authorization/Registration';
import { Auth } from '@/widgets/Authorization/model/constants.ts';

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}

export const Authorization = ({ isOpen, onClose }: Props) => {
  const [authState, setAuthState] = useState<Auth>(Auth.login);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modal}>
        {authState ? (
          <>
            <Login onSubmit={onClose} />
            <div onClick={() => setAuthState(Auth.registration)} role="presentation">
              или зарегистрироваться
            </div>
          </>
        ) : (
          <>
            <Registration onSubmit={onClose} />
            <div onClick={() => setAuthState(Auth.login)} role="presentation">
              уже зарегистрированы?
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
