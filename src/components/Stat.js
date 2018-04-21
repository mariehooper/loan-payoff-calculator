import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

export default function Stat({ title, number, savings }) {
  return (
    <StatsWrapper>
      <StatsHeader>{title}</StatsHeader>
      <StatsNumber>{number}</StatsNumber>
      <Savings>- {savings}</Savings>
    </StatsWrapper>
  );
}

Stat.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  savings: PropTypes.string.isRequired,
};

const StatsWrapper = styled.div`
  border: 1px solid var(--white);
  margin: 1rem 0.5rem;
  padding: 0.5rem;
  text-align: center;
`;

const StatsHeader = styled.h3`
  margin: 0;
  font-weight: 300;
  font-size: 1rem;
  color: var(--white);
`;

const StatsNumber = styled.p`
  font-size: 2rem;
  color: var(--white);
  margin: 0.2rem;
`;

const Savings = StatsNumber.extend`
  font-size: 0.9rem;
  font-weight: 300;
`;
