import React from 'react';
import PropTypes from 'prop-types';
import './Totals.css';

export default function Totals({ duration, interest }) {
  return (
    <div className="totals">
      <div className="stats total-interest">
        <h3 className="stats-header">Projected Interest Paid</h3>
        <p className="stats-number">{interest.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
      </div>
      <div className="stats estimate-payoff">
        <h3 className="stats-header">Estimated Payoff</h3>
        <p className="stats-number">{Math.ceil(duration)} Months</p>
      </div>
    </div>
  );
}

Totals.propTypes = {
  duration: PropTypes.number,
  interest: PropTypes.number,
};

Totals.defaultProps = {
  duration: 0,
  interest: 0,
};
