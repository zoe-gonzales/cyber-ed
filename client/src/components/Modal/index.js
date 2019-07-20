import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

const ResultsModal = ({ children }) => {
  return (
    ReactDOM.createPortal(
      <div className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content lead">
            <div className="modal-body">
              <p>{children}</p>
            </div>
          </div>
        </div>
      </div>,
      document.getElementById('modal-root'),
    )
  );
};

export default ResultsModal;
