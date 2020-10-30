/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import cookies from 'js-cookie';
import faker from 'faker';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer, {
  addChannel, addMessage, removeChannel, renameChannel,
} from './reducers/index';
import NicknameContext from './nickname-context';
import App from './components/App';

export default (gon) => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  if (!cookies.get('nickname')) {
    const newNickName = faker.name.findName();
    cookies.set('nickname', newNickName);
  }

  const nickname = cookies.get('nickname');

  const preloadedState = {
    channelsInfo: {
      channels: gon.channels,
      currentChannelId: gon.currentChannelId,
    },
    messagesInfo: {
      messages: gon.messages,
    },
  };

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  const socket = io();

  socket.on('newMessage', ({ data }) => {
    store.dispatch(addMessage({ message: data }));
  });

  socket.on('newChannel', ({ data }) => {
    store.dispatch(addChannel({ channel: data }));
  });

  socket.on('removeChannel', ({ data: { id } }) => {
    store.dispatch(removeChannel({ channelId: id }));
  });

  socket.on('renameChannel', ({ data: { id, attributes } }) => {
    store.dispatch(renameChannel({ id, attributes }));
  });

  ReactDOM.render(
    <Provider store={store}>
      <NicknameContext.Provider value={nickname}>
        <App />
      </NicknameContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
