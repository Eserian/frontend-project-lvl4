import React from 'react';
import cn from 'classnames';
import Button from './Button';
import DropdownButton from './DropdownButton';
import { setCurrentChannel, openModal, closeModal } from '../reducers/index';
import getModal from './modals/index';

const handleChoose = (id, dispatch) => () => dispatch(setCurrentChannel({ channelId: id }));
const handleRename = (id, dispatch) => () => dispatch(openModal({ type: 'renaming', channelId: id }));
const handleRemove = (id, dispatch) => () => dispatch(openModal({ type: 'removing', channelId: id }));

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

const renderChannel = (getBtnClass, dispatch, { name, id, removable }) => (
  <li key={id} className="nav-item">
    {removable ? (
      <DropdownButton
        handleChoose={handleChoose(id, dispatch)}
        handleRemove={handleRemove(id, dispatch)}
        handleRename={handleRename(id, dispatch)}
        name={name}
        cName={getBtnClass(id)}
      />
    )
      : (
        <Button
          handleChoose={handleChoose(id, dispatch)}
          name={name}
          cName={getBtnClass(id)}
        />
      )}
  </li>
);

const Channels = (props) => {
  const {
    currentChannelId,
    modalInfo,
    dispatch,
    channels,
  } = props;

  const getBtnClass = (id) => cn(
    {
      'btn-primary': id === currentChannelId,
      'btn-light': id !== currentChannelId,
    },
  );

  return (
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
  );
};

export default Channels;
