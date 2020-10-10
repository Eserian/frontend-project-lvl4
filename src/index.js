/* eslint-disable react/jsx-filename-extension */
// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom';
import gon from 'gon';
import App from './App';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

// import faker from 'faker';

// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);

ReactDOM.render(
  <React.StrictMode>
    <App channels={gon.channels} />
  </React.StrictMode>,
  document.getElementById('chat'),
);
