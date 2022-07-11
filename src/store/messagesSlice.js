import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const id = action.payload;
        const removingMessages = Object.values(state.entities)
          .filter(({ channelId }) => channelId === id)
          .map((message) => message.id);
          messagesAdapter.removeMany(state, removingMessages);
      })
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { addMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;