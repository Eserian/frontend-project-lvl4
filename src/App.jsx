import React from 'react';

export default ({ channels }) => (
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
              <button type="button" className="nav-link btn-block mb-2 text-left btn btn-primary">{name}</button>
            </li>
          ))
        }
      </ul>
    </div>
    <div className="col h-100" />
  </div>
);
