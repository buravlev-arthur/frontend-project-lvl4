import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './channelsSlice';
import messagesSlice from './messagesSlice';
import modalSlice from './modalSlice';

const store = configureStore({
  reducer: {
    channels: channelsSlice,
    messages: messagesSlice,
    modalWindow: modalSlice,
  },
});

export default store;
