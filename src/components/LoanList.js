import React from 'react';
import './LoanList.css';

export default function LoanList({ loans, openModal }) {
  return (
    <div className="loan-list-wrapper">
      <div className="loan-list-header">
        <div className="column-type">Type</div>
        <div className="column-issuer">Issuer</div>
        <div className="column-rate">Rate</div>
        <div className="column-compound">Compound</div>
        <div className="column-balance">Balance</div>
        <div className="column-payment">Payment</div>
      </div>
      <ul className="loan-list">
        {loans.map(loan => (
          <li>
            <div className="loan-details column-type">{loan.type}</div>
            <div className="loan-details column-issuer">{loan.issuer}</div>
            <div className="loan-details column-rate">{loan.rate}%</div>
            <div className="loan-details column-compound">{loan.compound}</div>
            <div className="loan-details column-balance">{Number(loan.balance).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
            <div className="loan-details column-payment">{Number(loan.payment).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
          </li>
        ))}
      </ul>
      <div className="button-row">
        <button className="btn add-loan" onClick={openModal}>Add Loan</button>
      </div>
    </div>
  );
}

LoanList.propTypes = {
  loans: React.PropTypes.arrayOf(React.PropTypes.shape({
    type: React.PropTypes.string,
    issuer: React.PropTypes.string,
    rate: React.PropTypes.number,
    compound: React.PropTypes.string,
    balance: React.PropTypes.number,
    payment: React.PropTypes.number,
  })).isRequired,
  openModal: React.PropTypes.func.isRequired,
};
