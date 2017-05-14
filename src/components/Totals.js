import React from 'react';

export default function Totals({ balance, payment, duration }) {
  return (
    <div className="totals">
      <div className="stats total-balance">
        <h3 className="stats-header">Total Balance</h3>
        <p className="stats-number">{balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
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
  balance: React.PropTypes.number,
  payment: React.PropTypes.number,
  duration: React.PropTypes.number,
};

Totals.defaultProps = {
  balance: 0,
  payment: 0,
  duration: 0,
};
