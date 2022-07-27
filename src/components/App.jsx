import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider as StoreProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { I18nextProvider } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import i18n from '../i18n';
import AuthProvider from '../providers/AuthProvider';
import SocketProvider from '../providers/SocketProvider';
import store from '../store/index';
import Header from './Header';
import ModalWindow from './ModalWindow';
import Login from '../pages/Login';
import Chat from '../pages/Chat';
import SignUp from '../pages/Signup';
import NotFound from '../pages/NotFound';

export default function App({ config }) {
  const { actions, pages, rollbarConfig } = config;

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary errorMessage="Error in React render">
        <StoreProvider store={store}>
          <I18nextProvider i18n={i18n}>
            <SocketProvider actions={actions}>
              <AuthProvider>
                <Container fluid className="App vh-100">
                  <BrowserRouter>
                    <Header />
                    <Routes>
                      <Route path={pages.chat} element={<Chat />} />
                      <Route path={pages.login} element={<Login />} />
                      <Route path={pages.signup} element={<SignUp />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <ToastContainer position="bottom-right" />
                    <ModalWindow />
                  </BrowserRouter>
                </Container>
              </AuthProvider>
            </SocketProvider>
          </I18nextProvider>
        </StoreProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
}
