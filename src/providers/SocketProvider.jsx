import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import SocketContext from '../contexts/SocketContext';
import AuthContext from '../contexts/AuthContext';
import { addMessage } from '../store/messagesSlice';
import { addChannel, removeChannel, renameChannel, setCurrentChannelId } from '../store/channelsSlice';

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const сurrentChannelId = useSelector(({ channels }) => channels.currentChannelId);

  useEffect(() => {
    if (!auth.userIsLogged()) {
      return;
    }

    const chatServer = io();

    chatServer.on('connect', () => {
      setSocket(chatServer);
    });

    chatServer.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });

    chatServer.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
    });

    chatServer.on('renameChannel', ({ id, name }) => {
      dispatch(renameChannel({ id, changes: { name } }));
    });
  }, []);

  useEffect(() => {
    if (socket === null) {
      return;
    }

    socket.off('removeChannel');

    socket.on('removeChannel', ({ id }) => {
      dispatch(removeChannel(id));

      if (сurrentChannelId === id) {
        dispatch(setCurrentChannelId(1));
      }
    });
  }, [сurrentChannelId]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;