import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Rollbar from 'rollbar';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider as  StoreProvider } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { I18nextProvider } from 'react-i18next';
import AuthProvider from '../providers/AuthProvider';
import SocketProvider from '../providers/SocketProvider';
import store from '../store/index';
import i18n, { setI18n } from '../i18n';
import initSocket from '../socket';
import Header from './Header';
import ModalWindow from './ModalWindow';
import Login from '../pages/Login';
import Chat from '../pages/Chat';
import SignUp from '../pages/Signup';
import NotFound from '../pages/NotFound';
import routes from '../routes';

const App = () => {
  setI18n();
  const actions = initSocket();
  const { pages: { login, chat, signup } } = routes;

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
    environment: 'production',
  };

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
                      <Route path={chat} element={<Chat />} />
                      <Route path={login} element={<Login />} />
                      <Route path={signup} element={<SignUp />} />
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
};

export default App;
