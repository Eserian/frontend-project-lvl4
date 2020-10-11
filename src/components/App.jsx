import React, { useContext } from 'react';
import cn from 'classnames';
import axios from 'axios';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannel } from '../reducers/index';
import routes from '../routes';
import NicknameContext from '../nickname-context';

const handleSubmit = (channelId, nickname) => async ({ body }, { resetForm }) => {
  await axios.post(routes.channelMessagesPath(channelId), {
    data: {
      attributes: {
        body,
        nickname,
      },
    },
  });
  resetForm({ values: '' });
};

export default () => {
  const messages = useSelector((store) => store.messagesInfo.messages);
  const channels = useSelector((store) => store.channelsInfo.channels);
  const currentChannelId = useSelector((store) => store.channelsInfo.currentChannelId);
  const nickname = useContext(NicknameContext);
  const dispatch = useDispatch();
  const f = useFormik({ onSubmit: handleSubmit(currentChannelId, nickname), initialValues: { body: '' } });

  const getBtnClass = (id) => cn(
    'nav-link btn-block mb-2 text-left btn',
    {
      'btn-primary': id === currentChannelId,
      'btn-light': id !== currentChannelId,
    },
  );

  return (
    <div className="row h-100 pb-3">
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>Channels</span>
          <button type="button" className="ml-auto p-0 btn btn-link">+</button>
        </div>
        <ul className="nav flex-column nav-pills nav-fill">
          {
            channels.map(({ id, name }) => (
              <li key={id} className="nav-item">
                <button
                  type="button"
                  className={getBtnClass(id)}
                  onClick={() => dispatch(setCurrentChannel({ channelId: id }))}
                >
                  {name}
                </button>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
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
          <div className="mt-auto">
            <form noValidate onSubmit={f.handleSubmit}>
              <div className="form-group">
                <div className="input-group">
                  <input
                    name="body"
                    aria-label="body"
                    className="mr-2 form-control"
                    value={f.values.body}
                    onChange={f.handleChange}
                    disabled={f.isSubmitting}
                  />
                  <button aria-label="submit" type="submit" className="btn btn-primary" disabled={f.isSubmitting}>Submit</button>
                  <div className="d-block invalid-feedback">&nbsp;</div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
