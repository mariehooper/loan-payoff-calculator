import React from 'react';
import PropTypes from 'prop-types';
import './Totals.css';
import { convertToCurrency } from '../utils';

export default function Totals({ duration, interest, durationSavings, interestSavings }) {
  function monthsToYears(time) {
    return time > 12 ? `${(time / 12).toFixed(1)} years` : `${Math.ceil(time)} months`;
  }

  return (
    <div className="totals">
      <div className="stats total-interest">
        <h3 className="stats-header">Projected Interest Paid</h3>
        <p className="stats-number">{convertToCurrency(interest - interestSavings)}</p>
        <p className="stats-number stats-savings">- {convertToCurrency(interestSavings)}</p>
      </div>
      <div className="stats estimate-payoff">
        <h3 className="stats-header">Estimated Payoff Time</h3>
        <p className="stats-number">{monthsToYears(duration - durationSavings)}</p>
        <p className="stats-number stats-savings"> - {monthsToYears(durationSavings)}</p>
      </div>
      <p className="savings-message">By paying extra, you could save <span>{convertToCurrency(interestSavings)}</span> and finish <span>{monthsToYears(durationSavings)}</span> early!</p>
    </div>
  );
}

Totals.propTypes = {
  duration: PropTypes.number,
  interest: PropTypes.number,
  durationSavings: PropTypes.number,
  interestSavings: PropTypes.number,
};

Totals.defaultProps = {
  duration: 0,
  interest: 0,
  durationSavings: 0,
  interestSavings: 0,
};
