import React from 'react';
import PropTypes from 'prop-types';
import './Stat.css';

export default function Stat({ title, number, savings }) {
  return (
    <div className="stats">
      <h3 className="stats-header">{title}</h3>
      <p className="stats-number">{number}</p>
      <p className="stats-number stats-savings">- {savings}</p>
    </div>
  );
}

Stat.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  savings: PropTypes.number.isRequired,
};
