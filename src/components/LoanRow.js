import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import './LoanRow.css';
import { convertToCurrency } from '../utils';

export default class LoanRow extends React.Component {
  handleEdit = () => {
    this.props.openModal(this.props.loan.id);
  }

  handleDelete = () => {
    this.props.removeLoan(this.props.loan.id);
  }

  handleRangeChange = (event, loan) => {
    const loanCopy = { ...loan };
    loanCopy.additional = event.target.value;
    this.props.updateLoan(loanCopy);
  }

  render() {
    const { type, issuer, rate, balance, payment, additional } = this.props.loan;
    return (
      <tr>
        <td>{type}</td>
        <td className="expandable-cell">{issuer}</td>
        <td>{rate}%</td>
        <td>{convertToCurrency(balance)}</td>
        <td>{convertToCurrency(payment)}</td>
        <td className="range-slider">
          <input
            className="range-slider__range"
            type="range"
            name="additional"
            min="0"
            max="2000"
            step="5"
            onChange={(event) => { this.handleRangeChange(event, this.props.loan); }}
            value={additional}
          />
          <span className="range-slider__value">${additional}</span>
        </td>
        <td>
          <Button theme="link" onClick={this.handleEdit}>Edit</Button>
          <Button theme="link" onClick={this.handleDelete}>Delete</Button>
        </td>
      </tr>
    );
  }
}

LoanRow.propTypes = {
  loan: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    issuer: PropTypes.string,
    rate: PropTypes.string,
    balance: PropTypes.string,
    payment: PropTypes.string,
    additional: PropTypes.string,
  }).isRequired,
  updateLoan: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  removeLoan: PropTypes.func.isRequired,
};
