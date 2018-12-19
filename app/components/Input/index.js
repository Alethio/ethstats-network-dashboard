import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ type, placeholder, defaultValue, value, onChange }) =>
  <div className="input">
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
    />
  </div>;


Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.func,
};


export default Input;
