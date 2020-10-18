import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NicknameContext from '../nickname-context';
import Form from './Form';
import Channels from './Channels';

import Messages from './Messages';

export default () => {
  const messages = useSelector((store) => store.messagesInfo.messages);
  const channels = useSelector((store) => store.channelsInfo.channels);
  const modalInfo = useSelector((store) => store.modal);
  const currentChannelId = useSelector((store) => store.channelsInfo.currentChannelId);
  const nickname = useContext(NicknameContext);
  const dispatch = useDispatch();

  return (
    <div className="row h-100 pb-3">
      <Channels
        channels={channels}
        modalInfo={modalInfo}
        dispatch={dispatch}
        currentChannelId={currentChannelId}
      />
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <Messages messages={messages} currentChannelId={currentChannelId} />
          <Form currentChannelId={currentChannelId} nickname={nickname} />
        </div>
      </div>
    </div>
  );
};
