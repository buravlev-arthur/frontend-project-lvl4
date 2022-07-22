/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ currentChannelId: null });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    setDefaultChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        state.currentChannelId = 1;
      }
    },
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export const {
  addChannels,
  addChannel,
  removeChannel,
  renameChannel,
  setCurrentChannelId,
  setDefaultChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
