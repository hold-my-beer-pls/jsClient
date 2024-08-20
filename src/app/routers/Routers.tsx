import { Route, Routes } from 'react-router-dom';
import { Layout } from '../layout/Layout.tsx';
import { HomePage } from '@/pages/HomePage';
import { Quiz } from '@/pages/Quiz';
import { AdminPanel } from '@/pages/AdminPanel';
import { Header } from '@/widgets/Header';
import { Profile } from '@/pages/Profile/ui/Profile.tsx';
import { Navigation } from '@/shared/constants';
import { useAppSelector } from '@/shared/lib/hooks';
import { selectUser } from '@/entities/User';
import { AdminQuestions } from '@/pages/AdminQuestions';
import { QuestionPreview } from '@/widgets/Question/QuestionPreview';

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
              <Route path={Navigation.questionsList}>
                <Route index element={<AdminQuestions />} />
                <Route path={Navigation.id} element={<QuestionPreview />} />
              </Route>
            </Route>
          )}
        </Route>
        <Route path={Navigation.quiz} element={<Quiz />} />
        <Route path={Navigation.other} element={<div>not found</div>} />
      </Route>
    </Routes>
  );
};
