import React from 'react';
import PropTypes from 'prop-types';
import './Totals.css';

export default function Totals({ balance, payment, duration, interest }) {
  return (
    <div className="totals">
      <div className="stats total-balance">
        <h3 className="stats-header">Total Balance</h3>
        <p className="stats-number">{balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
      </div>
      <div className="stats total-interest">
        <h3 className="stats-header">Total Interest</h3>
        <p className="stats-number">{interest.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
      </div>
      <div className="stats total-monthly">
        <h3 className="stats-header">Total Monthly Payment</h3>
        <p className="stats-number">{payment.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
      </div>
      <div className="stats estimate-payoff">
        <h3 className="stats-header">Estimated Payoff</h3>
        <p className="stats-number">{Math.ceil(duration)} Months</p>
      </div>
    </div>
  );
}

Totals.propTypes = {
  balance: PropTypes.number,
  payment: PropTypes.number,
  duration: PropTypes.number,
  interest: PropTypes.number,
};

Totals.defaultProps = {
  balance: 0,
  payment: 0,
  duration: 0,
  interest: 0,
};
