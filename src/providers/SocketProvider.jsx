import React, { useMemo } from 'react';
import SocketContext from '../contexts/SocketContext';

export default function SocketProvider({ actions, children }) {
  const {
    sendMessage,
    addNewChannel,
    deleteChannel,
    setChannelName,
  } = actions;

  const emits = useMemo(() => ({
    sendMessage,
    addNewChannel,
    deleteChannel,
    setChannelName,
  }));

  return (
    <SocketContext.Provider value={emits}>
      {children}
    </SocketContext.Provider>
  );
}
