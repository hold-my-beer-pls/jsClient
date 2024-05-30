import ReactDOM from 'react-dom/client';
import { Providers } from '@/app/providers/Providers.tsx';
import { Routers } from '@/app/routers/Routers.tsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Providers>
    <Routers />
  </Providers>,
);
