import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import convertToCurrency from '../utils/convertToCurrency.js';
import Stat from './Stat';

export default function Totals({
  duration,
  interest,
  durationSavings,
  interestSavings,
}) {
  function monthsToYears(time) {
    return time > 12
      ? `${(time / 12).toFixed(1)} years`
      : `${Math.ceil(time)} months`;
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
      <SavingsMessage>
        By paying extra, you could save{' '}
        <span>{convertToCurrency(interestSavings)}</span> and finish{' '}
        <span>{monthsToYears(durationSavings)}</span> early!
      </SavingsMessage>
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

const SavingsMessage = styled.p`
  color: var(--white);
  font-weight: 300;
  font-size: 1.1rem;
  padding: 0 0.5rem;
  span {
    font-weight: 600;
  }
`;
