import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Header from './Header';
import Login from '../pages/Login';
import Chat from '../pages/Chat';
import NotFound from '../pages/NotFound';
import AuthContext from '../contexts/AuthContext';

const AuthProvider = ({ children }) => {
  const userIsLogged = () => localStorage.getItem('userId') ? true : false;
  const [logged, setLogged] = useState(userIsLogged());

  const logIn = (token) => {
    localStorage.setItem('userId', token);
    setLogged(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLogged(false);
  };

  const getAuthHeader = () => {
    if (!logged) {
      return {};
    }

    const token = localStorage.getItem('userId');
    return { Authorization: `Bearer ${token}` };
  };

  return (
    <AuthContext.Provider value={{logged, logIn, logOut, userIsLogged, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Container fluid className="App vh-100">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </AuthProvider>
  );
}

export default App;
