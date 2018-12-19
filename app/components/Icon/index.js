import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ name, className, activeColor }) => {
  if (className) {
    return (
      <span className={`icon ${className} icon-${name} ${activeColor}`}/>
    );
  }

  return (
    <span className={`icon icon-${name}`}/>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  activeColor: PropTypes.string,
};

export default Icon;
