import React from 'react';

const Button = ({ handleChoose, name, cName }) => (
  <button
    type="button"
    className={`nav-link btn-block mb-2 text-left btn ${cName}`}
    onClick={handleChoose}
  >
    {name}
  </button>
);

export default Button;
