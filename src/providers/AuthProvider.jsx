import { useState } from 'react';
import AuthContext from '../contexts/AuthContext';

const AuthProvider = ({ children }) => {
  const userIsLogged = () => localStorage.getItem('userId') ? true : false;
  const [logged, setLogged] = useState(userIsLogged());

  const logIn = (token, username) => {
    localStorage.setItem('userId', token);
    localStorage.setItem('username', username);
    setLogged(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    setLogged(false);
  };

  const getUsername = () => localStorage.getItem('username');

  const getAuthHeader = () => {
    if (!logged) {
      return {};
    }

    const token = localStorage.getItem('userId');
    return { Authorization: `Bearer ${token}` };
  };

  return (
    <AuthContext.Provider value={{logged, logIn, logOut, userIsLogged, getAuthHeader, getUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;