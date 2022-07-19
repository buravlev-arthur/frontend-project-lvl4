import SocketContext from '../contexts/SocketContext';

const SocketProvider = ({ actions, children }) => {
  const {
    sendMessage,
    addNewChannel,
    deleteChannel,
    setChannelName,
  } = actions;

  return (
    <SocketContext.Provider value={{ sendMessage, addNewChannel, deleteChannel, setChannelName }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;