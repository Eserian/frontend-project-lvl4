import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import cn from 'classnames';
import axios from 'axios';
import routes from '../routes';

const handleSubmit = (channelId, nickname) => async ({ body }, { resetForm, setStatus }) => {
  try {
    await axios.post(routes.channelMessagesPath(channelId), {
      data: {
        attributes: {
          body,
          nickname,
        },
      },
    });
    resetForm({ values: '' });
  } catch (e) {
    setStatus(e.message);
    console.log(e.message);
  }
};

const Form = (props) => {
  const { currentChannelId, nickname } = props;
  const f = useFormik({ onSubmit: handleSubmit(currentChannelId, nickname), initialValues: { body: '' } });

  const inputClass = cn('mr-2 form-control',
    {
      'is-invalid': f.status,
    });

  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.select();
  }, [currentChannelId]);

  return (
    <div className="mt-auto">
      <form noValidate onSubmit={f.handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <input
              ref={inputEl}
              name="body"
              aria-label="body"
              className={inputClass}
              value={f.values.body}
              onChange={f.handleChange}
              disabled={f.isSubmitting}
            />
            <button aria-label="submit" type="submit" className="btn btn-primary" disabled={f.isSubmitting}>Submit</button>
            <div className="d-block invalid-feedback">{f.status}</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
