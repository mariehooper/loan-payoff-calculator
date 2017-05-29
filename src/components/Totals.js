import React from 'react';
import PropTypes from 'prop-types';
import Stat from './Stat';
import './Totals.css';
import { convertToCurrency } from '../utils';

export default function Totals({ duration, interest, durationSavings, interestSavings }) {
  function monthsToYears(time) {
    return time > 12 ? `${(time / 12).toFixed(1)} years` : `${Math.ceil(time)} months`;
  }

  return (
    <div className="totals">
      <Stat
        title="Projected Interest Paid"
        number={convertToCurrency(interest - interestSavings)}
        savings={convertToCurrency(interestSavings)}
      />
      <Stat
        title="Estimated Payoff Time"
        number={monthsToYears(duration - durationSavings)}
        savings={monthsToYears(durationSavings)}
      />
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
