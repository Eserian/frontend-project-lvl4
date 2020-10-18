/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

const DropdownButton = ({
  handleChoose,
  handleRemove,
  handleRename,
  cName,
  name,
}) => (
  <div className="btn-group d-flex mb-2 dropdown">
    <button
      type="button"
      className={`btn flex-grow-1 text-left nav-link ${cName}`}
      onClick={handleChoose}
    >
      {name}
    </button>
    <button
      type="button"
      className={`btn flex-grow-0 dropdown-toggle dropdown-toggle-split ${cName}`}
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    />
    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <a className="dropdown-item" href="#" role="button" onClick={handleRename}>Rename</a>
      <a className="dropdown-item" href="#" role="button" onClick={handleRemove}>Remove</a>
    </div>
  </div>
);

export default DropdownButton;
