import React from 'react';
import PropTypes from 'prop-types';
import './Totals.css';

export default function Totals({ duration, interest, durationSavings, interestSavings }) {
  return (
    <div className="totals">
      <div className="stats total-interest">
        <h3 className="stats-header">Projected Interest Paid</h3>
        <p className="stats-number">{(interest - interestSavings).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
        {/* <h4 className="stats-header">Interest Saved</h4> */}
        <p className="stats-number stats-savings">- {interestSavings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
      </div>
      <div className="stats estimate-payoff">
        <h3 className="stats-header">Estimated Payoff Time</h3>
        <p className="stats-number">{Math.ceil(duration - durationSavings)} months</p>
        {/* <h4 className="stats-header">Time Saved</h4> */}
        <p className="stats-number stats-savings"> - {Math.ceil(durationSavings)} months</p>
      </div>
      <p className="savings-message">By paying extra, you could save <span>{interestSavings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span> and finish <span>{Math.ceil(durationSavings)}</span> months early!</p>
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
  durationSavings: 0,
  interestSavings: 0,
};
