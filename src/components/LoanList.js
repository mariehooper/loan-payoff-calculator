import React from 'react';
import PropTypes from 'prop-types';
import './LoanList.css';

function convertToCurrency(amount) {
  return Number(amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export default class LoanList extends React.Component {

  handleEdit = (event) => {
    this.props.setLoanToEdit(event.target.parentNode.parentNode.dataset.id);
    this.props.openModal();
  }

  handleAdd = () => {
    this.props.setLoanToEdit(undefined);
    this.props.openModal();
  }

  handleRangeChange = (event, loan) => {
    const loanCopy = { ...loan };
    loanCopy.additional = event.target.value;
    this.props.updateLoan(loanCopy);
  }

  render() {
    const { loans, totals } = this.props;
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
              <tr key={loan.id} data-id={loan.id}>
                <td>{loan.type}</td>
                <td className="expandable-cell">{loan.issuer}</td>
                <td>{loan.rate}%</td>
                <td>{convertToCurrency(loan.balance)}</td>
                <td>{convertToCurrency(loan.payment)}</td>
                <td className="range-slider">
                  <input
                    className="range-slider__range"
                    type="range"
                    name="additional"
                    min="0"
                    max="2000"
                    step="5"
                    onChange={(event) => { this.handleRangeChange(event, loan); }}
                    value={loan.additional}
                  />
                  <span className="range-slider__value">${loan.additional}</span>
                </td>
                <td><button className="btn btn-link edit-loan" onClick={this.handleEdit}>Edit</button></td>
              </tr>
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
  totals: PropTypes.shape({
    balance: PropTypes.string,
    payment: PropTypes.string,
  }).isRequired,
};
