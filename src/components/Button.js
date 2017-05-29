import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

export default function Button({ type, theme, onClick, children }) {
  return <button type={type} className={`btn btn-${theme}`} onClick={onClick}>{children}</button>;
}

Button.propTypes = {
  type: PropTypes.string,
  theme: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
};

Button.defaultProps = {
  type: 'button',
  theme: '',
  onClick: undefined,
};
