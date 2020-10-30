import React from 'react';

const Messages = ({ data }) => (
  <div id="message-box" className="chat-messages overflow-auto mb-3">
    {
      data
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
