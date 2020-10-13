import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import routes from '../../routes';

const generateOnSubmit = ({ onHide, dispatch }, id) => async () => {
  axios.delete(routes.channelPath(id));
  dispatch(onHide());
};

const Remove = (props) => {
  const { isOpen, dispatch, onHide } = props;
  const channelId = useSelector((store) => store.modal.channelId);
  const onSubmit = generateOnSubmit(props, channelId);

  return (
    <Modal show={isOpen} onHide={() => dispatch(onHide())}>
      <Modal.Header closeButton>
        <Modal.Title>Remove</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure?</p>
        <div className="d-flex justify-content-between">
          <input className="btn btn-secondary" type="button" onClick={() => dispatch(onHide())} value="Cancel" />
          <input className="btn btn-danger" type="button" value="Confirm" onClick={onSubmit} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
