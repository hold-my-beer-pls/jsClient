import { JSX, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ErrorBoundary } from '@/pages/ErrorBoundary';
import { setupStore } from '@/app/store/store.ts';

interface Props {
  children: JSX.Element;
}

export const Providers = ({ children }: Props) => {
  const store = setupStore();

  return (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <ErrorBoundary>{children}</ErrorBoundary>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
};
