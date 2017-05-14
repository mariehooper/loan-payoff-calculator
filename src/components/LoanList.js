import React from 'react';
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
  loans: React.PropTypes.arrayOf(React.PropTypes.shape({
    type: React.PropTypes.string,
    issuer: React.PropTypes.string,
    rate: React.PropTypes.string,
    compound: React.PropTypes.string,
    balance: React.PropTypes.string,
    payment: React.PropTypes.string,
  })).isRequired,
  openModal: React.PropTypes.func.isRequired,
  setLoanToEdit: React.PropTypes.func.isRequired,
};
