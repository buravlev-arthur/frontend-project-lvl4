import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Header from './Header';
import Login from '../pages/Login';
import Chat from '../pages/Chat';
import NotFound from '../pages/NotFound';
import AuthContext from '../contexts/AuthContext';

function App() {
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

  return (
    <AuthContext.Provider value={{logged, logIn, logOut, userIsLogged }}>
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
    </AuthContext.Provider>
  );
}

export default App;
