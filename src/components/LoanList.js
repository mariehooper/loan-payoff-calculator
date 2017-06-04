import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import LoanRow from './LoanRow';
import { convertToCurrency } from '../utils';

export default function LoanList({ loans, totals, updateLoan, removeLoan, openModal }) {
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
            <th>Addtl Payment</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {loans.map(loan => (
            <LoanRow
              key={loan.id}
              loan={loan}
              openModal={openModal}
              updateLoan={updateLoan}
              removeLoan={removeLoan}
            />
          ))}
        </tbody>
        <tfoot>
          {loans.length > 0 &&
            <tr className="summary-row">
              <td colSpan={2} />
              <td className="summary-title">Totals:</td>
              <td>{convertToCurrency(totals.balance)}</td>
              <td>{convertToCurrency(totals.payment)}</td>
              <td />
            </tr>
          }
        </tfoot>
      </table>
      <div className="button-row">
        <Button onClick={openModal}>Add Loan</Button>
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
