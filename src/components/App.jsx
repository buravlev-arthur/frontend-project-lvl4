import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from '../providers/AuthProvider';
import Header from './Header';
import Login from '../pages/Login';
import Chat from '../pages/Chat';
import SignUp from '../pages/Signup';
import NotFound from '../pages/NotFound';
import routes from '../routes';

const App = () => {
  const { pages: { login, chat, signup } } = routes;

  return (
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
        </BrowserRouter>
      </Container>
    </AuthProvider>
  );
}

export default App;
