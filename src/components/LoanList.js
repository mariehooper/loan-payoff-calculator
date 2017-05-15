import React from 'react';
import PropTypes from 'prop-types';
import './LoanList.css';

export default class LoanList extends React.Component {

  handleEdit = (event) => {
    this.props.setLoanToEdit(event.target.parentNode.dataset.id);
    this.props.openModal();
  }

  handleAdd = () => {
    this.props.setLoanToEdit(undefined);
    this.props.openModal();
  }

  render() {
    const { loans } = this.props;
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
            <li key={loan.id} data-id={loan.id}>
              <div className="loan-details column-type">{loan.type}</div>
              <div className="loan-details column-issuer">{loan.issuer}</div>
              <div className="loan-details column-rate">{loan.rate}%</div>
              <div className="loan-details column-compound">{loan.compound}</div>
              <div className="loan-details column-balance">{Number(loan.balance).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
              <div className="loan-details column-payment">{Number(loan.payment).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
              <button className="btn btn-link edit-loan" onClick={this.handleEdit}>Edit</button>
            </li>
          ))}
        </ul>
        <div className="button-row">
          <button className="btn add-loan" onClick={this.handleAdd}>Add Loan</button>
        </div>
      </div>
    );
  }
}

LoanList.propTypes = {
  loans: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    issuer: PropTypes.string,
    rate: PropTypes.string,
    compound: PropTypes.string,
    balance: PropTypes.string,
    payment: PropTypes.string,
  })).isRequired,
  openModal: PropTypes.func.isRequired,
  setLoanToEdit: PropTypes.func.isRequired,
};
