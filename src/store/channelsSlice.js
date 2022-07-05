import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ currentChannelId: null });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const { addChannels, setCurrentChannelId } = channelsSlice.actions; 
export default channelsSlice.reducer;