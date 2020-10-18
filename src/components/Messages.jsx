import React from 'react';

const Messages = ({ messages, currentChannelId }) => (
  <div id="message-box" className="chat-messages overflow-auto mb-3">
    {
      messages
        .filter((m) => m.channelId === currentChannelId)
        .map((m) => (
          <div key={m.id}>
            <b>{m.nickname}</b>
            {': '}
            {m.body}
          </div>
        ))
    }
  </div>
);

export default Messages;
