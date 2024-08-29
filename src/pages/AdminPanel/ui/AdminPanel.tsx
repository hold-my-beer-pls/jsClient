import { useNavigate } from 'react-router-dom';
import styles from './AdminPanel.module.scss';
import { AdminPages } from '@/entities/Admin';
import { Navigation } from '@/shared/constants/navigation.ts';

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {AdminPages.map(({ name, icon, link }) => (
        <div
          className={styles.page}
          key={name}
          onClick={() => navigate(`${Navigation.admin}/${link}`)}
          role="presentation"
        >
          <div className={styles.page_label}>{name}</div>
          <div className={styles.page_icon}>{icon}</div>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
