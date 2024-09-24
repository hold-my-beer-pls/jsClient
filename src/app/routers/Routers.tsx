import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from '../layout/Layout.tsx';
import { Header } from '@/widgets/Header';
import { Navigation } from '@/shared/constants';
import { useAppSelector } from '@/shared/lib/hooks';
import { selectUser } from '@/entities/User';
import { QuestionPreview } from '@/widgets/Question/QuestionPreview';
import { Error, LoaderJs } from '@/shared/ui';
import { Quiz, Result } from '@/pages/Quiz';
import { AdminUsers } from '@/pages/AdminUsers';

const AdminPanel = lazy(() => import('@/pages/AdminPanel'));
const Profile = lazy(() => import('@/pages/Profile'));
const HomePage = lazy(() => import('@/pages/HomePage'));
const AdminQuestions = lazy(() => import('@/pages/AdminQuestions'));

export const Routers = () => {
  const { isAdmin } = useAppSelector(selectUser);

  return (
    <Suspense fallback={<LoaderJs forPage />}>
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
                <Route path={Navigation.usersList} element={<AdminUsers />} />
              </Route>
            )}
          </Route>
          <Route path={Navigation.quiz}>
            <Route index element={<Quiz />} />
            <Route path={Navigation.result} element={<Result />} />
            <Route path=":ids" element={<Quiz />} />
          </Route>
          <Route path={Navigation.other} element={<Error forPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
