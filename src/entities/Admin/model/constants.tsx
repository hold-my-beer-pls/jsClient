import { Navigation } from '@/shared/constants';
import DocumentFilterIcon from '@/shared/assets/icons/document-filter.svg';
import ProfilesIcon from '@/shared/assets/icons/profile-2-users.svg';

export const AdminPages = [
  {
    name: 'Список вопросов',
    link: Navigation.questionsList,
    icon: <DocumentFilterIcon />,
  },
  {
    name: 'Список пользователей',
    link: Navigation.usersList,
    icon: <ProfilesIcon />,
  },
];
