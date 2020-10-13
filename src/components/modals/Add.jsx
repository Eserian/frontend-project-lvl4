import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import routes from '../../routes';

const generateOnSubmit = ({ onHide, dispatch }) => async (values) => {
  await axios.post(routes.channelsPath(), {
    data: {
      attributes: {
        name: values.body,
      },
    },
  });
  dispatch(onHide());
};

const Add = (props) => {
  const { isOpen, dispatch, onHide } = props;
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: generateOnSubmit(props),
  });

  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.select();
  }, []);

  return (
    <Modal show={isOpen} onHide={() => dispatch(onHide())}>
      <Modal.Header closeButton>
        <Modal.Title>Add</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              data-testid="input-body"
              ref={inputEl}
              name="body"
              required
              value={formik.values.body}
              onChange={formik.handleChange}
            />
          </FormGroup>
          <div className="d-flex justify-content-between">
            <input className="btn btn-secondary" type="button" onClick={() => dispatch(onHide())} value="Cancel" />
            <input className="btn btn-primary" type="submit" value="Submit" />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
