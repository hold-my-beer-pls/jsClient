import { Route, Routes } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { Quiz } from '@/pages/Quiz';
import { AdminPanel } from '@/pages/AdminPanel';
import { Header } from '@/widgets/Header';
import { Layout } from '../layout/Layout.tsx';
import { Profile } from '@/pages/Profile/ui/Profile.tsx';
import { Navigation } from '@/shared/constants';
import { AdminCreateQuestion } from '@/pages/AdminCreateQuestion';
import { useAppSelector } from '@/shared/lib/hooks';
import { selectUser } from '@/entities/User';
import { AdminQuestionList } from '@/pages/AdminQuestionList';

export const Routers = () => {
  const { isAdmin } = useAppSelector(selectUser);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<Header />}>
          <Route path={Navigation.profile} element={<Profile />} />
          <Route path={Navigation.home} element={<HomePage />} />
          {isAdmin && (
            <Route path={Navigation.admin}>
              <Route index element={<AdminPanel />} />
              <Route path={Navigation.createQuestion} element={<AdminCreateQuestion />} />
              <Route path={Navigation.questionsList} element={<AdminQuestionList />} />
            </Route>
          )}
        </Route>
        <Route path={Navigation.quiz} element={<Quiz />} />
        <Route path={Navigation.other} element={<div>not found</div>} />
      </Route>
    </Routes>
  );
};
