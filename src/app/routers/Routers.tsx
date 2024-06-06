import { Route, Routes } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { Quiz } from '@/pages/Quiz';
import { AdminPanel } from '@/pages/AdminPanel';
import { Header } from '@/widgets/Header';
import { Layout } from '../layout/Layout.tsx';

export const Routers = () => {
  const isAdmin = true;

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<Header />}>
          <Route path="/profile" element={<div>profile</div>} />
          <Route path="/" element={<HomePage />} />
          {isAdmin && <Route path="/admin-panel" element={<AdminPanel />} />}
        </Route>
        <Route path="/quiz" element={<Quiz />} />
        <Route path="*" element={<div>not found</div>} />
      </Route>
    </Routes>
  );
};
