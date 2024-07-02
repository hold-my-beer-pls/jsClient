import { Navigation } from '@/shared/constants';
import NoteAddIcon from '@/shared/assets/icons/note-add.svg';
import DocumentFilterIcon from '@/shared/assets/icons/document-filter.svg';

export const AdminPages = [
  { name: 'Создать вопрос', link: Navigation.createQuestion, icon: <NoteAddIcon /> },
  { name: 'Список вопросов', link: Navigation.questionsList, icon: <DocumentFilterIcon /> },
];
