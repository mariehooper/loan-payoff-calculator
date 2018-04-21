import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import pig from '../media/piggy-bank-2.png';
import { PrimaryButton } from './Button';

export default function EmptyState({ openModal }) {
  return (
    <div className="page-wrapper">
      <EmptyStateWrapper>
        <EmptyStateImg src={pig} alt="piggy bank" />
        <EmptyStateHeader>No loans added!</EmptyStateHeader>
        <p>Make a plan to pay off your loans! Add one to get started.</p>
        <PrimaryButton onClick={openModal}>Add Loan</PrimaryButton>
      </EmptyStateWrapper>
    </div>
  );
}

EmptyState.propTypes = {
  openModal: PropTypes.func.isRequired,
};

const EmptyStateWrapper = styled.div`
  margin: 2em auto auto;
  text-align: center;
  p {
    margin: 0 0 2rem;
    color: #555;
  }
`;

const EmptyStateImg = styled.img`
  width: 300px;
`;

const EmptyStateHeader = styled.h2`
  margin-top: 1rem;
`;
