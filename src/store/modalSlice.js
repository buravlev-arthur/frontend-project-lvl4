/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  params: {
    show: false,
    type: 'add',
    channelId: null,
    channelName: '',
  },
};

const modalAdapter = createSlice({
  name: 'modalWindow',
  initialState,
  reducers: {
    openModalWindow: (state, { payload }) => {
      state.params = payload;
    },
    closeModalWindow: (state) => {
      state.params.show = false;
    },
  },
});

export default modalAdapter.reducer;
export const { openModalWindow, closeModalWindow } = modalAdapter.actions;
