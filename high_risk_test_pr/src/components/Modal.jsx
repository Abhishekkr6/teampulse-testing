/**
 * Modal Component
 * Reusable modal dialog component with customizable content
 */

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ isOpen, title, children, onClose, actions = [] }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClose = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      onClose();
      setIsAnimating(false);
    }, 300);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isAnimating ? 'closing' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="modal-body">{children}</div>

        <div className="modal-footer">
          {actions.map((action) => (
            <button
              key={action.id}
              className={`btn btn-${action.variant || 'primary'}`}
              onClick={() => {
                action.handler();
                if (action.closeOnClick) handleClose();
              }}
            >
              {action.label}
            </button>
          ))}
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      handler: PropTypes.func.isRequired,
      variant: PropTypes.string,
      closeOnClick: PropTypes.bool,
    })
  ),
};

export default Modal;
