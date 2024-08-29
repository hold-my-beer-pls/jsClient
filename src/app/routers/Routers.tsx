import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from '../layout/Layout.tsx';
import { Header } from '@/widgets/Header';
import { Navigation } from '@/shared/constants';
import { useAppSelector } from '@/shared/lib/hooks';
import { selectUser } from '@/entities/User';
import { QuestionPreview } from '@/widgets/Question/QuestionPreview';
import { LoaderJs } from '@/shared/ui';

const AdminPanel = lazy(() => import('@/pages/AdminPanel'));
const Profile = lazy(() => import('@/pages/Profile'));
const Quiz = lazy(() => import('@/pages/Quiz'));
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
              </Route>
            )}
          </Route>
          <Route path={Navigation.quiz} element={<Quiz />} />
          <Route path={Navigation.other} element={<div>not found</div>} />
        </Route>
      </Routes>
    </Suspense>
  );
};
