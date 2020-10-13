/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';

import { createSlice } from '@reduxjs/toolkit';
import gon from 'gon';

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [...gon.channels],
    currentChannelId: 1,
  },
  reducers: {
    addChannel(state, action) {
      const { channel: { attributes } } = action.payload;
      state.channels.push(attributes);
    },
    setCurrentChannel(state, action) {
      const { channelId } = action.payload;
      state.currentChannelId = channelId;
    },
    removeChannel(state, action) {
      const { channelId } = action.payload;
      state.channels = state.channels.filter((c) => c.id !== channelId);
    },
    renameChannel(state, action) {
      const { id, attributes } = action.payload;
      const channelToRename = state.channels.find((c) => c.id === id);
      channelToRename.name = attributes.name;
    },
  },
});

const { addChannel, setCurrentChannel, removeChannel, renameChannel } = channelsSlice.actions;

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [...gon.messages],
  },
  reducers: {
    addMessage(state, action) {
      const { message: { attributes } } = action.payload;
      state.messages.push(attributes);
    },
  },
  extraReducers: {
    [removeChannel]: (state, action) => {
      const { channelId } = action.payload;
      state.messages = state.messages.filter((m) => m.channelId !== channelId);
    },
  },
});

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    type: null,
    channelId: null,
  },
  reducers: {
    openModal(state, action) {
      state.isOpen = true;
      state.type = action.payload.type;
      state.channelId = action.payload.channelId;
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = null;
      state.channelId = null;
    },
  },
});

const { addMessage } = messagesSlice.actions;
const { openModal, closeModal } = modalSlice.actions;

export {
  addMessage,
  addChannel,
  setCurrentChannel,
  openModal,
  closeModal,
  removeChannel,
  renameChannel,
};

export default combineReducers({
  messagesInfo: messagesSlice.reducer,
  channelsInfo: channelsSlice.reducer,
  modal: modalSlice.reducer,
});
