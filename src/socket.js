import { io } from 'socket.io-client';
import store from './store/index';
import { addMessage } from './store/messagesSlice';
import {
  addChannel,
  renameChannel,
  removeChannel,
  setCurrentChannelId,
  setDefaultChannel,
} from './store/channelsSlice';

const initSocket = () => {
  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });

  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(renameChannel({ id, changes: { name } }));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel(id));
    store.dispatch(setDefaultChannel(id));
  });

  const sendMessage = (data, callback) => {
    socket.emit('newMessage', data, callback);
  };

  const addNewChannel = (name, callback) => {
    socket.emit('newChannel', { name }, ({ data }) => {
      store.dispatch(setCurrentChannelId(data.id));
      callback();
    });
  };

  const deleteChannel = (id, callback) => {
    socket.emit('removeChannel', { id }, callback);
  };

  const setChannelName = ({ id, name }, callback) => {
    socket.emit('renameChannel', { id, name }, callback);
  };

  return {
    sendMessage,
    addNewChannel,
    deleteChannel,
    setChannelName,
  };
};

export default initSocket;
