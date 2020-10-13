/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useRef } from 'react';
import cn from 'classnames';
import axios from 'axios';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannel, openModal, closeModal } from '../reducers/index';
import getModal from './modals/index';
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

const renderModal = (modalInfo, dispatch) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return (
    <Component
      isOpen={modalInfo.isOpen}
      onHide={closeModal}
      dispatch={dispatch}
    />
  );
};

const renderChannel = (getBtnClass, dispatch, { name, id, removable }) => {
  if (!removable) {
    return (
      <li key={id} className="nav-item">
        <button
          type="button"
          className={`nav-link btn-block mb-2 text-left btn ${getBtnClass(id)}`}
          onClick={() => dispatch(setCurrentChannel({ channelId: id }))}
        >
          {name}
        </button>
      </li>
    );
  }

  return (
    <li key={id} className="nav-item">
      <div className="btn-group d-flex mb-2 dropdown">
        <button
          type="button"
          className={`btn flex-grow-1 text-left nav-link ${getBtnClass(id)}`}
          onClick={() => dispatch(setCurrentChannel({ channelId: id }))}
        >
          {name}
        </button>
        <button
          type="button"
          className={`btn flex-grow-0 dropdown-toggle dropdown-toggle-split ${getBtnClass(id)}`}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        />
        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <a className="dropdown-item" href="#" role="button" onClick={() => dispatch(openModal({ type: 'renaming', channelId: id }))}>Rename</a>
          <a className="dropdown-item" href="#" role="button" onClick={() => dispatch(openModal({ type: 'removing', channelId: id }))}>Remove</a>
        </div>
      </div>
    </li>
  );
};

export default () => {
  const messages = useSelector((store) => store.messagesInfo.messages);
  const channels = useSelector((store) => store.channelsInfo.channels);
  const modalInfo = useSelector((store) => store.modal);
  const currentChannelId = useSelector((store) => store.channelsInfo.currentChannelId);
  const nickname = useContext(NicknameContext);
  const dispatch = useDispatch();
  const f = useFormik({ onSubmit: handleSubmit(currentChannelId, nickname), initialValues: { body: '' } });

  const getBtnClass = (id) => cn(
    {
      'btn-primary': id === currentChannelId,
      'btn-light': id !== currentChannelId,
    },
  );

  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.select();
  }, [currentChannelId]);

  return (
    <div className="row h-100 pb-3">
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>Channels</span>
          <button type="button" className="ml-auto p-0 btn btn-link" onClick={() => dispatch(openModal({ type: 'adding' }))}>+</button>
          {renderModal(modalInfo, dispatch)}
        </div>
        <ul className="nav flex-column nav-pills nav-fill">
          {
            channels.map((channel) => renderChannel(getBtnClass, dispatch, channel))
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
                    ref={inputEl}
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
