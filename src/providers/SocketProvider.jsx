import { useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import SocketContext from '../contexts/SocketContext';
import AuthContext from '../contexts/AuthContext';
import { addMessage } from '../store/messagesSlice';

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.userIsLogged()) {
      return;
    }

    const chatServer = io();

    chatServer.on('connect', () => {
      setSocket(chatServer);

      chatServer.on('newMessage', (payload) => {
        dispatch(addMessage(payload));
      });
    });
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;