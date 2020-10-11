import { combineReducers } from 'redux';

import { createSlice } from '@reduxjs/toolkit';
import gon from 'gon';

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
});

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
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = channelId;
    },
  },
});

const { addMessage } = messagesSlice.actions;
const { addChannel, setCurrentChannel } = channelsSlice.actions;

export { addMessage, addChannel, setCurrentChannel };

export default combineReducers({
  messagesInfo: messagesSlice.reducer,
  channelsInfo: channelsSlice.reducer,
});
