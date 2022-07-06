import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import AuthProvider from '../providers/AuthProvider';
import Header from './Header';
import Login from '../pages/Login';
import Chat from '../pages/Chat';
import NotFound from '../pages/NotFound';
import routes from '../routes';

const App = () => {
  const { pages: { login, chat } } = routes;

  return (
    <AuthProvider>
      <Container fluid className="App vh-100">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path={chat} element={<Chat />} />
            <Route path={login} element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </AuthProvider>
  );
}

export default App;
