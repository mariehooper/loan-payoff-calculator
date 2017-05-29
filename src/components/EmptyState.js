import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
// import './EmptyState.css';

export default function EmptyState({ openModal }) {
  return (
    <div className="page-wrapper">
      <div className="empty-state">
        <h2>No loans yet!</h2>
        <p>Make a plan to payoff your loans! Add one to get started.</p>
        <Button onClick={openModal}>Add Loan</Button>
      </div>
    </div>
  );
}

EmptyState.propTypes = {
  openModal: PropTypes.func.isRequired,
};
