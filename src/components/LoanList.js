import PropTypes from 'prop-types';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import convertToCurrency from '../utils/convertToCurrency.js';
import { PrimaryButton } from './Button';
import LoanRow from './LoanRow';

export default function LoanList({
  loans,
  totals,
  updateLoan,
  removeLoan,
  openModal,
}) {
  return (
    <div className="loan-list-wrapper">
      <table className="loan-list">
        <thead className="loan-list-header">
          <tr>
            <th>Type</th>
            <th>Issuer</th>
            <th>Rate</th>
            <th>Balance</th>
            <th>Payment</th>
            <th>Additional Payment</th>
            <th />
          </tr>
        </thead>
        <TransitionGroup className="loan-row" component="tbody">
          {loans.map(loan => (
            <CSSTransition
              classNames="loan-row"
              timeout={{ exit: 500, enter: 500 }}
              key={loan.id}
            >
              <LoanRow
                loan={loan}
                openModal={openModal}
                updateLoan={updateLoan}
                removeLoan={removeLoan}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
        <tfoot>
          {loans.length > 0 && (
            <tr className="summary-row">
              <td colSpan={2} />
              <td className="summary-title">Totals:</td>
              <td>{convertToCurrency(totals.balance)}</td>
              <td>{convertToCurrency(totals.payment)}</td>
              <td />
            </tr>
          )}
        </tfoot>
      </table>
      <div className="button-row">
        <PrimaryButton onClick={openModal}>Add Loan</PrimaryButton>
      </div>
    </div>
  );
}

LoanList.propTypes = {
  loans: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  updateLoan: PropTypes.func.isRequired,
  removeLoan: PropTypes.func.isRequired,
  totals: PropTypes.shape({
    balance: PropTypes.number,
    payment: PropTypes.number,
  }).isRequired,
};
