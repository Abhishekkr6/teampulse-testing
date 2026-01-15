/**
 * Input Component
 * Reusable input field component with validation
 */

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = ({
  name,
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  error = '',
  required = false,
  disabled = false,
  maxLength,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback(
    (e) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );

  return (
    <div className="input-wrapper">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        maxLength={maxLength}
        className={`input ${error ? 'input-error' : ''} ${isFocused ? 'input-focused' : ''}`}
        required={required}
        {...props}
      />
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
};

export default Input;
