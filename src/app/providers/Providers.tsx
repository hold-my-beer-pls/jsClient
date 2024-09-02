import { JSX, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SDKProvider } from '@telegram-apps/sdk-react';
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
          <SDKProvider debug={import.meta.env.DEV}>
            <ErrorBoundary>{children}</ErrorBoundary>
          </SDKProvider>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
};
