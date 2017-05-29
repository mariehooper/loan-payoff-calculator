import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import './LoanList.css';
import { convertToCurrency } from '../utils';

export default class LoanList extends React.Component {

  handleEdit = (event) => {
    this.props.openModal(event.target.parentNode.parentNode.dataset.id);
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
                <td><Button theme="link" onClick={this.handleEdit}>Edit</Button></td>
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
          <Button onClick={this.props.openModal}>Add Loan</Button>
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
  updateLoan: PropTypes.func.isRequired,
  totals: PropTypes.shape({
    balance: PropTypes.number,
    payment: PropTypes.number,
  }).isRequired,
};
