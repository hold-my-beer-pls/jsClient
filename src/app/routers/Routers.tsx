import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/app/layout';
import { HomePage } from '@/pages/HomePage';
import { Quiz } from '@/pages/Quiz';
import { AdminPanel } from '@/pages/AdminPanel';
import { Authorization } from '@/features/Authorization';

export const Routers = () => {
  const isAdmin = true;
  return (
    <Routes>
      <Route element={<Authorization />}>
        <Route element={<Layout />}>
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
