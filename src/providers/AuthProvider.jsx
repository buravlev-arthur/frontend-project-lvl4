import React, { useState, useMemo } from 'react';
import AuthContext from '../contexts/AuthContext';

export default function AuthProvider({ children }) {
  const userIsLogged = () => {
    if (localStorage.getItem('userId')) {
      return true;
    }
    return false;
  };

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

  const auth = useMemo(() => ({
    logged,
    logIn,
    logOut,
    userIsLogged,
    getAuthHeader,
    getUsername,
  }), [logged, getAuthHeader]);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}
