import React from 'react';
import ReactDOM from 'react-dom/client';
import Rollbar from 'rollbar';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider as  StoreProvider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import App from './components/App';
import store from './store/index';
import i18n, { setI18n } from './i18n';

setI18n();

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  environment: 'production',
};

const rollbar = new Rollbar(rollbarConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RollbarProvider instance={rollbar}>
    <ErrorBoundary errorMessage="Error in React render">
      <StoreProvider store={store}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </StoreProvider>
    </ErrorBoundary>
  </RollbarProvider>
);
