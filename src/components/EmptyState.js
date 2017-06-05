import React from 'react';
import PropTypes from 'prop-types';
import pig from '../piggy-bank.png';
import Button from './Button';
import './EmptyState.css';

export default function EmptyState({ openModal }) {
  return (
    <div className="page-wrapper">
      <div className="empty-state">
        <img className="empty-state-graphic" src={pig} alt="piggy bank" />
        <h2 className="empty-state-header">No loans added!</h2>
        <p>Make a plan to pay off your loans! Add one to get started.</p>
        <Button onClick={openModal}>Add Loan</Button>
      </div>
    </div>
  );
}

EmptyState.propTypes = {
  openModal: PropTypes.func.isRequired,
};
