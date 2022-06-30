import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Chat = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.userIsLogged()) {
      navigate('/login');
    };
  });

  return (
    <>
      <p>Chat</p>
      <p>{String(auth.userIsLogged())}</p>
    </>
  );
};

export default Chat;