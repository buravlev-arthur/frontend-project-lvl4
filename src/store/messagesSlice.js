import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { addMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;